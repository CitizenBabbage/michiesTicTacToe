export const minimaxBlurb2 = `Minimax looks ahead to how the game could end, scoring a move that finally wins it the game as worth 3 points, a losing move as 1, and a draw as worth 2. Then it "recurses" back to look at all the moves that led to those endings, scoring them accordingly. To do this, Minimax must assume its opponent plays the minimum scoring move—-because that is worst for Minimax—-while Minimax on its turn plays the maximum scoring move. The name "Minimax" comes from this alternating pattern.`
