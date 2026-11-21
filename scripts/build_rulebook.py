"""Build public/pdf/the_abyss_rulebook.pdf (A5, navy and gold).

    python3 -m venv /tmp/rb && /tmp/rb/bin/pip install reportlab
    /tmp/rb/bin/python scripts/build_rulebook.py

Edit the text below; it must match RULES-v2.md and the Board Game Arena version.
"""
import os
from reportlab.lib.pagesizes import A5
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer,
                                Table, TableStyle, PageBreak, KeepTogether)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'pdf', 'the_abyss_rulebook.pdf')
pdfmetrics.registerFont(TTFont('Stylish', os.path.join(HERE, 'fonts', 'Stylish-Regular.ttf')))

NAVY = colors.HexColor('#14325c')
GOLD = colors.HexColor('#c9a74a')
CREAM = colors.HexColor('#fbf3dc')
PALE = colors.HexColor('#f3f6fa')
GREY = colors.HexColor('#555555')

body = ParagraphStyle('body', fontName='Helvetica', fontSize=7.6, leading=10.4, alignment=TA_JUSTIFY, spaceAfter=3)
bullet = ParagraphStyle('bullet', parent=body, leftIndent=9, bulletIndent=2, spaceAfter=2)
h1 = ParagraphStyle('h1', fontName='Helvetica', fontSize=11.5, leading=14, textColor=NAVY, spaceBefore=9, spaceAfter=3)
h2 = ParagraphStyle('h2', fontName='Helvetica', fontSize=8.6, leading=11, spaceBefore=4, spaceAfter=1.5)
center = ParagraphStyle('center', parent=body, alignment=TA_CENTER)
note = ParagraphStyle('note', parent=body, textColor=GREY, alignment=TA_CENTER)
title = ParagraphStyle('title', fontName='Stylish', fontSize=26, leading=30, alignment=TA_CENTER)
subtitle = ParagraphStyle('subtitle', fontName='Helvetica', fontSize=8.5, leading=11, textColor=GOLD, alignment=TA_CENTER)
cell = ParagraphStyle('cell', parent=body, alignment=0, spaceAfter=0)
cellh = ParagraphStyle('cellh', parent=cell, textColor=colors.white)

def P(t, s=body): return Paragraph(t, s)
def B(items): return [Paragraph(i, bullet, bulletText='•') for i in items]

def boxed(flowables, bg, border):
    t = Table([[flowables]], colWidths=[None])
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, -1), bg), ('BOX', (0, 0), (-1, -1), 0.6, border),
                           ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
                           ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
    return t

def first_page(c, doc):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, A5[1] - 9 * mm, A5[0], 9 * mm, stroke=0, fill=1)
    c.setFillColor(GOLD); c.rect(0, 0, A5[0], 3 * mm, stroke=0, fill=1)
    c.restoreState()

def later_pages(c, doc):
    c.saveState()
    c.setFont('Helvetica', 6); c.setFillColor(GREY)
    c.drawString(14 * mm, A5[1] - 9 * mm, 'THE ABYSS — RULES')
    c.drawRightString(A5[0] - 14 * mm, A5[1] - 9 * mm, str(doc.page))
    c.setStrokeColor(colors.HexColor('#dddddd')); c.setLineWidth(0.4)
    c.line(14 * mm, A5[1] - 10.5 * mm, A5[0] - 14 * mm, A5[1] - 10.5 * mm)
    c.setFillColor(GOLD); c.rect(0, 0, A5[0], 3 * mm, stroke=0, fill=1)
    c.restoreState()

story = []
# --- Page 1
story += [Spacer(1, 22 * mm), P('THE ABYSS', title), P('RULEBOOK', subtitle), Spacer(1, 5 * mm)]
story.append(boxed([P('COMPONENTS', center), Spacer(1, 2), P('51 cards · game aids · this rulebook', center)], colors.white, NAVY))
story += [Spacer(1, 3), P('2 – 4 players &nbsp;|&nbsp; about 30 min', center), Spacer(1, 4),
          P('Dive into the deep and hoard the richest treasures — but beware what lurks in the dark. '
            'Push your luck too far and the Abyss will swallow you whole.', note)]
story += [P('GAME OBJECTIVE', h1),
          P('The game is played over multiple rounds. At the end of each round, players score the points in their '
            'hand. Cards played in front of you do not count. The first player to reach <b>70 points</b> wins the game.')]
story += [P('THE CARDS', h1),
          P('Each card shows: a class icon (Gold, Eye, Hook or Sword); a point value for end-of-round scoring; for '
            'Eye, Hook and Sword cards, an icon for their combo effect; and a copy count at the bottom '
            '(e.g. 3× means three copies in the deck).'),
          P('Gold Cards', h2),
          P('Gold cards have no ability. Keep them in your hand — they are pure points at the end of the round.'),
          P('Panic Cards', h2),
          P('Panic cards are dangerous. When drawn, they are placed face-up in front of you immediately. They never '
            'enter your hand and cannot be discarded. See the Panic Cards section for full details.'),
          PageBreak()]
# --- Page 2
story += [P('GAME SETUP', h1), P('Shuffle the deck and deal 3 cards to each player.')]
story += B(["Any Panic cards in a player's opening hand must be placed face-up in front of them immediately. "
            "(They do not draw replacements.)",
            'Flip the top card of the deck face-up to start the discard pile. If it is a Panic card, shuffle it back '
            'in and flip again.'])
story += [P('PLAYING A TURN', h1), P('On your turn, follow these steps in order:'),
          P('1. Draw (mandatory)', h2), P('Choose one:')]
story += B(['Take the top card of the discard pile, or', 'Draw 2 cards from the deck, keep 1, and discard the other.'])
story.append(boxed([P('<b>Panic &amp; Drawing:</b> If one of the two drawn cards is Panic, place it face-up in front '
                      'of you and discard the other — you keep nothing. If both are Panic, place both face-up and '
                      'discard nothing.')], CREAM, CREAM))
story += [P('2. Play Combos (optional)', h2),
          P('You may play any number of combos. A combo is <b>2 cards of the same class</b> (Eye, Hook or Sword): '
            'place both face-up in front of you and resolve the effect. Remember: played cards lose their point value.'),
          P('3. Call Stop (optional)', h2),
          P('If you hold 25 or more points in your hand, you may declare STOP to end the round immediately.'),
          P('4. End Your Turn', h2), P('Play passes to the next player.'), PageBreak()]
# --- Page 3
story += [P('THE COMBOS', h1),
          P('To play a combo, place <b>2 cards of the same class</b> from your hand face-up in front of you and resolve '
            'its effect once. You may play several combos in the same turn. Combos can only be played during your '
            'turn, after drawing.')]
rows = [[P('Combo', cellh), P('Effect', cellh)],
        [P('Eye + Eye', cell), P('Look at the top 4 cards of the deck. Put them all back on top or on the bottom, in the same order.', cell)],
        [P('Hook + Hook', cell), P('Force a player (or yourself) to draw 2 cards from the deck and discard 1.', cell)],
        [P('Sword + Sword', cell), P("Choose one: steal 1 random card from an opponent's hand, or give one of your face-up Panic cards to an opponent.", cell)]]
t = Table(rows, colWidths=[22 * mm, None])
t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), NAVY), ('BACKGROUND', (0, 1), (-1, -1), PALE),
                       ('LINEBELOW', (0, 1), (-1, -2), 0.4, colors.HexColor('#c8d2de')), ('BOX', (0, 0), (-1, -1), 0.6, NAVY),
                       ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
story += [Spacer(1, 3), t]
story += [P('PANIC CARDS', h1),
          P('Panic cards never enter your hand. Whenever you draw one, place it face-up in front of you immediately. '
            'Panic cards cannot be discarded.'),
          P('Elimination', h2),
          P('A player who accumulates a 3rd Panic card in front of them is instantly eliminated from the round and scores 0.'),
          P('Removing Panic', h2), P('You can destroy one of your face-up Panic cards in two ways:')]
story += B(['<b>Discard points:</b> discard cards from your hand worth a total of 15 or more points to the discard pile.',
            '<b>Sword combo:</b> play 2 Swords and give one of your Panic cards to an opponent instead of stealing.'])
story.append(PageBreak())
# --- Page 4
story += [P('END OF THE ROUND', h1), P('The round ends immediately when any of the following occurs:')]
story += B(['A player declares Stop (requires 25+ points in hand).', 'The deck runs out of cards.',
            'Only 1 player remains (all others have been eliminated).'])
story += [P("All remaining players reveal their hands and count the points they hold. Each player's score is added to "
            'their total from previous rounds.'),
          P('END OF THE GAME', h1),
          P('After scoring a round, if any player has reached or exceeded 70 points, the game is over. The player with '
            'the highest total wins. In case of a tie, the player who took their turn last in the final round wins.'),
          P('SPECIAL SITUATIONS', h1)]
story += B(['<b>Sword vs. yourself:</b> You cannot steal from yourself, but you can target yourself with a Hook.',
            '<b>Multiple Panic at once:</b> Resolve them one at a time. You may discard 15+ points to destroy a Panic '
            'card before the next one is placed.',
            '<b>Gifting a 3rd Panic:</b> If a Sword combo gives an opponent their 3rd Panic card, the elimination check '
            'triggers immediately. That opponent must discard 15+ points or be eliminated.'])
story += [Spacer(1, 6), KeepTogether(boxed([
    P('QUICK REFERENCE — TURN ORDER', ParagraphStyle('qr', parent=center, textColor=NAVY)), Spacer(1, 3),
    P('1. Draw (discard pile or deck) → 2. Play Combos → 3. Call Stop → 4. End Turn', center), Spacer(1, 2),
    P('Combo = 2 cards of the same class &nbsp;|&nbsp; Stop = 25+ pts in hand &nbsp;|&nbsp; Win = first to 70 pts', center),
    P('3 Panic = eliminated &nbsp;|&nbsp; Remove Panic = discard 15+ pts', center)], CREAM, GOLD))]

doc = BaseDocTemplate(OUT, pagesize=A5, leftMargin=14 * mm, rightMargin=14 * mm, topMargin=15 * mm, bottomMargin=12 * mm,
                      title='The Abyss — Rulebook', author='Impossible Labs')
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='f')
doc.addPageTemplates([PageTemplate('first', [frame], onPage=first_page), PageTemplate('rest', [frame], onPage=later_pages)])
from reportlab.platypus import NextPageTemplate
story.insert(0, NextPageTemplate('rest'))
doc.build(story)
print('wrote', os.path.normpath(OUT))
