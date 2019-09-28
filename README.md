# discogsBullshit

Ok ca bug parce que mon programme lit ligne par ligne, mais le problème c'est que dans les descriptions, y a des &#13 qui représente des sauts de lignes. Du coup il la fonction saute et considère ca comme une ligne. Il faut rajouter un argument à es.split() pour que ca casse au bon endroit.
