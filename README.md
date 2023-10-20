Play with the app at: 

https://michies-tic-tac-toe.vercel.app/

<h1> Description </h1>
This is an AI playlab that teaches AI concepts via five historical (and quasi-historical) tic-tac-toe algorithms: 

MENACE: This is an algorithm originally implemented in 1962 by AI pioneer Donald Michie using matchboxes and beads. It's one of the earliest examples of artificial learning. (MENACE stands for 'Machine Educable Noughts and Crosses Engine). Despite Michie's claims to the contrary, MENACE is a slow learner, so also implemented is a feature that allows the user to wuickly run MENACE through hundreds of games to improve its play. 

Minimax: This is a common strategy for a range of games. It works by having the algorithm look ahead in the search tree and score outcomes, then use those outcomes to recursively score the moves that led to them. Minimax is so called because, when navigating the search space, it assumes it's opponent will always take the minimum scorng move (i.e. the one that's worst for minimax) while Minimax itself will take the highest scoring move.

Huris: This is my implementation of an algorithm designed by AI pioneers Newell and Simon (and Shaw?) in 1972. It works by following simple rules that obviate the need to search through the space of possibilities. Also implemented is a "rewiring" algo that allows the user to change the priorities on the rules and thus reprogram Huris to play differently. 

Neuro: This is a neural net implemented using tensorflow for js that learns by looking at board states and trying to predict the scores that would be produced by minimax. This is my own training paradigm, not based on anything historical, but I wanted to include a neural net because they are so important to the development of AI, especially in recent years. Currently users cannot alter the training paradigm too much, only controlling the number of epochs, but in future iterations I plan to allow the users to control the shape of the net. 

Evolvo: Evolvo is an example of genetic programming. It plays by obeying a ruleset, like Huris, but the importance of the rules is determined randomly, and the set contains a number of rules that are not anticipated to be helpful (heuristic noise). To train evolvo, a large number of randomized rulesets of this sort are made to play one another, and the best performers are mixed and mutated in a manner resembling Darwinian selection, while the worst performers are destroyed. The evolution design is my own. Users can currently control the size of the genepool and the number of generations. 

<h1>Issues</h1>
Currently, there is no way to stop the music once you choose audio on at the beginning. You just have to wait it out. 

Currently, switching audio to off at the beginning does not turn off sound effects, only music. 

Learning for MENACE is very slow. This is just a feature of the historical algorithm, so there's no way to improve it without sacrificing historicity. Still, I want to introduce a feature that minimises the extent to which MENACE re-tours the same parts of the game space when learning, better ensuring that after a sufficiently long training session it will have seen every situation at least once before. 

As stated above, there are relatively few interaction opportunities in the training of Neuro. I plan to let users play with the sie and shape of the net. 

I also plan to introduce some auto-diagramming to create an image of the network when the user designs it. 

I might also let the user set the learning rate. 

I may introduce more controls over the evolution for Evolvo, allowing the user to set the mutation rate, the percentage of algos that are culled versus mixed in each generation 

<h1>Credits</h1>
Some Credits (I plan to include in the app itself... in time...) 

Intro music: "Boss Time" - By David Renda, from: 

https://www.FesliyanStudios.com

Select opponent music: "Neon Gaming" by dopestuff on pixabay

https://pixabay.com/users/dopestuff-30965024/

The animation for the Evolvo leaderboard thanks to Josh Comeau here: 

https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/enter_leave_animations.md

Hourglass cursor adapted (extensively) using GIMP from: 

https://vectorportal.com/vector/hourglass-clip-art.ai/21950

Other cursors adapted using GIMP from wikimedia commons: 

https://en.wikipedia.org/wiki/Cursor_(user_interface)#/media/File:Mouse-cursor-hand-pointer.svg

Favicon from 

https://commons.wikimedia.org/wiki/File:Eo_circle_cyan_hash.svg

Voice changes for Evolvo, Minimax and Menace from: 

https://www.topmediai.com/voice-changer/#javascript

Neuro voice by Robot Booth app, available on the app store. 

Voice changes for Huris from Celebrity Voice Changer, available on the app store.  

Graphics created using a mixture of apps, but largely by using GIMP on something created by ai. I used the following extensively: 

https://www.craiyon.com/ (mostly for initial idea production)

https://starryai.com/

https://deepdreamgenerator.com/

