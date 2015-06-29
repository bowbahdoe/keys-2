FPS=60;
var canvas = document.getElementById("game-board");
var ctx = canvas.getContext("2d");
canvas.addEventListener("mousedown",onClick,false)
var clickMode = "standby"//"highlighted"
var color1 ="red"
var color2 ="black"
var currentTeam = 0
function contains (location, array)
{
    for(var index = 0;index<array.length;index++)
    {
        if(array[index].x ==  location.x)
        {
            if(array[index].y == location.y)
            {
                return true
            }
        }

        return false;

    }
}

function Key(team,orientation,isLocked,position)
{
    contains = function(location, array)
    {
        for(var index = 0;index<array.length;index++)
        {
            if(array[index].x ==  location.x)
            {
                if(array[index].y == location.y)
                {
                    return true
                }
            }

            return false;

        }
    }

    this.team = team
    this.orientation = orientation
    this.isLocked= isLocked
    this.position = position
    this.isSelected = false
    this.getAvailableMovements = function(gameBoard)
    {
        var openSpaces = gameBoard.getFreeSpaces()
        var notOpenSpaces = gameBoard.getPlacesWithKeys()
        var possibleSpaces = []
        if(this.orientation == "up")
        {
            for(var i=this.position.y-1;i>-1;i--)
            {
                if(contains({x:this.position.x,y:i}, notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:this.position.x,y:i})

                }
            }
        }else if(this.orientation == "down")
        {
            for(var i=this.position.y+1;i<8;i++)
            {
                if(contains({x:this.position.x,y:i}, notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:this.position.x,y:i})

                }
            }

        }
        else if(this.orientation == "left")
        {
            for(var i=this.position.x-1;i>-1;i--)
            {
                if(contains({x:i,y:this.position.y}, notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:i,y:this.position.y})

                }
            }
        }else if(this.orientation == "right")
        {
            for(var i=this.position.x+1;i<8;i++)
            {
                if(contains({x:i,y:this.position.y}, notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:i,y:this.position.y})

                }
            }
        }else if(this.orientation == "upleft")
        {
            for(var i=1;((this.position.x-i>-1)&&(this.position.y-i>-1));i++)
            {
                if(contains({x:this.position.x-i,y:this.position.y-i},notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:this.position.x-i,y:this.position.y-i})

                }
            }

        }else if(this.orientation == "upright")
        {
            for(var i=1;((this.position.x+i<9)&&(this.position.y-i>-1));i++)
            {
                if(contains({x:this.position.x+i,y:this.position.y-i},notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:this.position.x+i,y:this.position.y-i})

                }
            }
        }else if(this.orientation == "downleft")
        {
            for(var i=1;((this.position.x-i>-1)&&(this.position.y+i<9));i++)
            {
                if(contains({x:this.position.x-i,y:this.position.y+i}, notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:this.position.x-i,y:this.position.y+i})

                }
            }
        }else if(this.orientation == "downright")
        {
            for(var i=1;((this.position.x+i<9)&&(this.position.y+i<9));i++)
            {
                if(contains({x:this.position.x+i,y:this.position.y+i},notOpenSpaces))
                {
                    break;
                }
                else
                {
                    possibleSpaces.push({x:this.position.x+i,y:this.position.y+i})

                }
            }

        }
        return possibleSpaces
    }
    this._upleftrotation=null;
    this._uprotation=null;
    this._uprightrotation=null;
    this._rightrotation=null;
    this._downrightrotation=null;
    this._downrotation=null;
    this._downleftrotation=null;
    this._leftrotation=null;
    this.rotationPoints = null
    this.highlightRotatationPoints = function(canvas)
    {
        var innerColor;
        var outerColor;
        var possibleMoves = []
        this._upleftrotation={y:this.position.y-1,x:this.position.x-1}
        this._uprotation={y:this.position.y-1,x:this.position.x}
        this._uprightrotation={y:this.position.y-1,x:this.position.x+1}
        this._rightrotation={y:this.position.y,x:this.position.x+1}
        this._downrightrotation={y:this.position.y+1,x:this.position.x+1}
        this._downrotation={y:this.position.y+1,x:this.position.x}
        this._downleftrotation={y:this.position.y+1,x:this.position.x-1}
        this._leftrotation={y:this.position.y,x:this.position.x-1}
        if((!(this.isOutOfBounds(this._upleftrotation))) && this.orientation!="upleft")
        {
            possibleMoves.push(this._upleftrotation)
        }
        if((!(this.isOutOfBounds(this._uprotation))) && (this.orientation!="up"))
        {
            possibleMoves.push(this._uprotation)
        }
        if((!(this.isOutOfBounds(this._uprightrotation))) && (this.orientation!="upright"))
        {
            possibleMoves.push(this._uprightrotation)
        }

        if((!(this.isOutOfBounds(this._rightrotation))) && (this.orientation!="right"))
        {
            possibleMoves.push(this._rightrotation)
        }

        if((!(this.isOutOfBounds(this._downrightrotation))) && (this.orientation!="downright"))
        {
            possibleMoves.push(this._downrightrotation)
        }

        if((!(this.isOutOfBounds(this._downrotation))) && (this.orientation!="down"))
        {
            possibleMoves.push(this._downrotation)
        }

        if((!(this.isOutOfBounds(this._downleftrotation))) && (this.orientation!="downleft"))
        {
            possibleMoves.push(this._downleftrotation)
        }

        if((!(this.isOutOfBounds(this._leftrotation))) && (this.orientation!="left"))
        {
            possibleMoves.push(this._leftrotation)
        }
        var innerColor;
        var outerColor;
        console.log(possibleMoves)
        for(var i = 0;i<possibleMoves.length;i++)
        {
            if(possibleMoves[i].x%2==0)
            {
                if(possibleMoves[i].y%2==0)
                {
                    innerColor=color1
                }
                else
                {
                    innerColor=color2
                }
            }
            else
            {
                if(possibleMoves[i].y%2==0)
                {
                    innerColor=color2
                }
                else
                {
                    innerColor=color1
                }
            }
            if(canvas.width>canvas.height)
            {
                BLOCKHEIGHT= canvas.height/8;
                BLOCKWIDTH = BLOCKHEIGHT;
            }else{
                BLOCKWIDTH= canvas.width/8 ;
                BLOCKHEIGHT = BLOCKWIDTH ;
            }
            ctx = canvas.getContext("2d")

            outerColor="green"
            ctx.fillStyle=outerColor
            ctx.fillRect(possibleMoves[i].x*BLOCKWIDTH,possibleMoves[i].y*BLOCKHEIGHT,BLOCKWIDTH,BLOCKHEIGHT)

            ctx.fillStyle=innerColor
            ctx.fillRect(possibleMoves[i].x*BLOCKWIDTH+(BLOCKWIDTH/8),
            possibleMoves[i].y*BLOCKHEIGHT+(BLOCKHEIGHT/8),
                    BLOCKWIDTH*(6/8),BLOCKHEIGHT*(6/8))
        }
        this.rotationPoints = possibleMoves

    }
    this.isOutOfBounds = function(point)
    {
        if(point == null)
        {
            return true
        }
        else if (point.x>7 || point.y>7 || point.x<0 || point.y<0)
        {
            return true;
        }
        else
        {
            return false;
        }
    };
    this.highlightPossibleMoves = function(canvas)
    {
        var innerColor;
        var outerColor;
        var possibleMoves = this.getAvailableMovements(board)
        for(var i = 0;i<possibleMoves.length;i++)
        {
            if(possibleMoves[i].x%2==0)
            {
                if(possibleMoves[i].y%2==0)
                {
                    innerColor=color1
                }
                else
                {
                    innerColor=color2
                }
            }
            else
            {
                if(possibleMoves[i].y%2==0)
                {
                    innerColor=color2
                }
                else
                {
                    innerColor=color1
                }
            }
            if(canvas.width>canvas.height)
            {
                BLOCKHEIGHT= canvas.height/8;
                BLOCKWIDTH = BLOCKHEIGHT;
            }else{
                BLOCKWIDTH= canvas.width/8 ;
                BLOCKHEIGHT = BLOCKWIDTH ;
            }
            ctx = canvas.getContext("2d")

            outerColor="purple"
            ctx.fillStyle=outerColor
            ctx.fillRect(possibleMoves[i].x*BLOCKWIDTH,possibleMoves[i].y*BLOCKHEIGHT,BLOCKWIDTH,BLOCKHEIGHT)

            ctx.fillStyle=innerColor
            ctx.fillRect(possibleMoves[i].x*BLOCKWIDTH+(BLOCKWIDTH/8),
            possibleMoves[i].y*BLOCKHEIGHT+(BLOCKHEIGHT/8),
                    BLOCKWIDTH*(6/8),BLOCKHEIGHT*(6/8))
        }
    }
    this.render = function(canvas)
    {
        var image = new Image()
        //depending on orientation, do junk
        var imageSource = "svg/"
        if(this.team == "gold")
        {
            var team = "gold"
            imageSource+="gold/"
        }else
        {
            var team = "grey"
            imageSource+="grey/"
        }

        if(this.orientation == "up")
        {
            imageSource += "arrow-up-right-"+team+".svg"

            image.src = imageSource
        }else{console.log(this.orientation)
        image.src = imageSource}
        image.src="svg/silver1.svg"
        var ctx = canvas.getContext("2d")
        if(canvas.width>canvas.height)
        {
            BLOCKHEIGHT= canvas.height/8;
            BLOCKWIDTH = BLOCKHEIGHT;
        }else{
            BLOCKWIDTH= canvas.width/8 ;
            BLOCKHEIGHT = BLOCKWIDTH ;
        }
        ctx.drawImage(image,this.position.x*BLOCKWIDTH,this.position.y*BLOCKHEIGHT,
                      BLOCKWIDTH,BLOCKHEIGHT)
        if((clickMode=="highlighted") && (this.isSelected==true))
        {
            this.highlightPossibleMoves(canvas);
            this.highlightRotatationPoints(canvas);
        }


    }
}
function GameBoard(PositionArray)
{
    this.PositionArray= PositionArray

    this.LockedPieceArray = [[null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null],
                            [null,null,null,null,null,null,null,null]];
    this.movePiecefromAtoB = function(loc1,loc2)//loc = {x: cood,y: cood}
	{
	    /*if(this.PositionArray[loc2.y][loc2.x]==null)
        {
            this.PositionArray[loc2.y][loc2.x]=this.PositionArray[loc1.y][loc1.x]
            console.log(loc1)
            this.PositionArray[loc2.y][loc2.x].position = {x:loc2.x, y:loc2.y}
            this.PositionArray[loc1.y][loc1.x] = null

        }else{*/
            if(contains(loc2, this.PositionArray[loc1.y][loc1.x].getAvailableMovements(board)) || true)
            {
                this.PositionArray[loc2.y][loc2.x]=this.PositionArray[loc1.y][loc1.x]
                this.PositionArray[loc2.y][loc2.x].position = {x:loc2.x, y:loc2.y}
                this.PositionArray[loc1.y][loc1.x] = null
                clickMode = "standby"
            }if(contains(loc2, board.getPlacesWithLockedKeys()))
            {}
            //check for other team, lock, etc}\
        //}
	}
    this.lockPieceAtLoc = function(location)
    {
        if(this.PositionArray[location.y][location.x] != null)
        {
           this.PositionArray[location.y][location.x].isLocked=true
           this.LockedPieceArray[location.y][location.x] = this.PositionArray[location.y][location.x]
           this.PositionArray[location.y][location.x] = null
        }
    }
    this.unlockPieceAtLoc= function(location)
    {
        if(this.LockedPieceArray[location.y][location.x] != null)
        {
            this.LockedPieceArray[location.y][location.x].isLocked=false
            this.PositionArray[location.y][location.x] = this.LockedPieceArray[location.y][location.x]
            this.LockedPieceArray[location.y][location.x] = null
        }
    }
    this.isPieceAtLoc= function(location)
    {
        if(this.PositionArray[location.y][location.x] != null)
        {
           return true
        }
        else
        {
           return false
        }
    }
    this.isLockedPieceAtLoc= function(location)
    {
        if(this.LockedPieceArray[location.y][location.x] != null)
        {
           return true
        }
        else
        {
           return false
        }
    }
    this.getFreeSpaces = function()
    {
        var freeSpaces;
        freeSpaces = []

        for(index_y=0;index_y<8;index_y++)
        {
            for(index_x=0;index_x<8;index_x++)
            {
                if(!(this.isPieceAtLoc({x:index_x,y:index_y})))
                {
                    freeSpaces.push({x:index_x,y:index_y})
                }
            }
        }
        return freeSpaces
    }
    this.getPlacesWithKeys = function()
    {
        var placesWithKeys = [];
        for(index_y=0;index_y<8;index_y++)
        {
            for(index_x=0;index_x<8;index_x++)
            {
                if(this.isPieceAtLoc({x:index_x,y:index_y}) && this.PositionArray[index_y][index_x].isLocked==false)
                {
                    placesWithKeys.push({x:index_x,y:index_y})
                }
            }
        }
        return placesWithKeys
    }
    this.getPlacesWithLockedKeys = function()
    {
        var placesWithLockedKeys = [];
        for(index_y=0;index_y<8;index_y++)
        {
            for(index_x=0;index_x<8;index_x++)
            {
                if(this.isPieceAtLoc({x:index_x,y:index_y}) && this.PositionArray[index_y][index_x].isLocked==true)
                {
                    placesWithLockedKeys.push({x:index_x,y:index_y})
                }
            }
        }
        return placesWithLockedKeys
    }
    this.render = function(canvas)
    {
        drawBoard(canvas)
        for(var index_y=0;index_y<8;index_y++)
        {
            for(var index_x=0;index_x<8;index_x++)
            {
                var item = this.PositionArray[index_y][index_x]
                if(item!=null)
                {

                    item.render(canvas)
                }
            }
        }
    }
}

var key3 = new Key("gold","left",false,{x:3,y:3})
var key1 =new Key("gold","up",false,{x:1,y:3})
var board = new GameBoard(
                        [[null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,key1,null,key3,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null],
                        [null,null,null,null,null,null,null,null]]
                       )

console.log(board.getFreeSpaces())
console.log(board.getPlacesWithKeys())
console.log(board.getPlacesWithLockedKeys())

stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
// Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
// They will mess up mouse coordinates and this fixes that
var html = document.body.parentNode;
htmlTop = html.offsetTop;
htmlLeft = html.offsetLeft;


// Creates an object with x and y defined,
// set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky,
// we have to worry about padding and borders
// takes an event and a reference to the canvas
function getMouse(e, canvas) {
  var element = canvas, offsetX = 0, offsetY = 0, mx, my;

  // Compute the total offset. It's possible to cache this if you want
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
  // This part is not strictly necessary, it depends on your styling
  offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
  offsetY += stylePaddingTop + styleBorderTop + htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  // We return a simple javascript object with x and y defined
  return {x: mx, y: my};
}

function getSquare(mouseClick)
{
    /* 0 1 2 3 4 5 6 7 8
     0
     1
     2
     3
     4
     5
     6
     7
    */
    if(canvas.width>canvas.height)
    {
        BLOCKHEIGHT= canvas.height/8;
        BLOCKWIDTH = BLOCKHEIGHT;
    }else{
        BLOCKWIDTH= canvas.width/8 ;
        BLOCKHEIGHT = BLOCKWIDTH ;
    }

    var x_cood= 0
    var y_cood= 0
    if(mouseClick.x<=BLOCKWIDTH)
    {   x_cood = 0}
    else if(mouseClick.x>BLOCKWIDTH && mouseClick.x<= (BLOCKWIDTH*2))
    {   x_cood = 1}
    else if(mouseClick.x>(BLOCKWIDTH*2) && mouseClick.x<= (BLOCKWIDTH*3))
    {   x_cood = 2}
    else if(mouseClick.x>(BLOCKWIDTH*3) && mouseClick.x<= (BLOCKWIDTH*4))
    {   x_cood = 3}
    else if(mouseClick.x>(BLOCKWIDTH*4) && mouseClick.x<= (BLOCKWIDTH*5))
    {   x_cood = 4}
    else if(mouseClick.x>(BLOCKWIDTH*5) && mouseClick.x<= (BLOCKWIDTH*6))
    {   x_cood = 5}
    else if(mouseClick.x>(BLOCKWIDTH*6) && mouseClick.x<= (BLOCKWIDTH*7))
    {   x_cood = 6}
    else if(mouseClick.x>(BLOCKWIDTH*7) && mouseClick.x<= (BLOCKWIDTH*8))
    {   x_cood = 7}


    if(mouseClick.y<=BLOCKWIDTH)
    {   y_cood = 0}
    else if(mouseClick.y>BLOCKWIDTH && mouseClick.y<= (BLOCKWIDTH*2))
    {   y_cood = 1}
    else if(mouseClick.y>(BLOCKWIDTH*2) && mouseClick.y<= (BLOCKWIDTH*3))
    {   y_cood = 2}
    else if(mouseClick.y>(BLOCKWIDTH*3) && mouseClick.y<= (BLOCKWIDTH*4))
    {   y_cood = 3}
    else if(mouseClick.y>(BLOCKWIDTH*4) && mouseClick.y<= (BLOCKWIDTH*5))
    {   y_cood = 4}
    else if(mouseClick.y>(BLOCKWIDTH*5) && mouseClick.y<= (BLOCKWIDTH*6))
    {   y_cood = 5}
    else if(mouseClick.y>(BLOCKWIDTH*6) && mouseClick.y<= (BLOCKWIDTH*7))
    {   y_cood = 6}
    else if(mouseClick.y>(BLOCKWIDTH*7) && mouseClick.y<= (BLOCKWIDTH*8))
    {   y_cood = 7}

    return {x:x_cood , y:y_cood};

}
function onClick(event)
{
    var mouseClick = getMouse(event,canvas)

    click_x=  mouseClick.x
    click_y= mouseClick.y
    z = getSquare(mouseClick)



    if(board.isPieceAtLoc(z))
    {
        for(var i = 0;i<8;i++)
        {
            for(var d = 0;d<8;d++)
            {
                if(board.PositionArray[i][d]!=null)
                {
                    board.PositionArray[i][d].isSelected = false
                }

            }
        }
        board.PositionArray[z.y][z.x].isSelected=(!(board.PositionArray[z.y][z.x].isSelected))
        if(clickMode=="standby"){clickMode="highlighted"}
        else if(clickMode=="highlighted"){clickMode="standby"}
    }else{
        if(clickMode=="highlighted"){

            for(var i = 0;i<8;i++)
            {
                for(var d = 0;d<8;d++)
                {

                    if(board.PositionArray[i][d]!=null)
                    {
                        if(board.PositionArray[i][d].isSelected == true)
                        {
                            var ld = (board.PositionArray[i][d]).getAvailableMovements(board)
                            var le = ld.length
                            for(var c = 0;c<le;c++)
                            {
                                console.log(board.PositionArray[i][d])
                                //console.log(board.PositionArray[i][d])
                                var testPos_x =ld[c].x
                                var testPos_y =ld[c].y
                                if(testPos_x==z.x && testPos_y==z.y)
                                {
                                    board.movePiecefromAtoB(board.PositionArray[i][d].position,board.PositionArray[i][d].getAvailableMovements(board)[c])

                                }

                            }
                            var rotations = board.PositionArray[i][d].rotationPoints
                            var rotLen = rotations.length
                            for(var c=0;c<rotLen;c++)
                            {
                              var testPos_x =rotations[c].x
                              var testPos_y =rotations[c].y
                              if(testPos_x==z.x && testPos_y==z.y)
                              {
                                  board.movePiecefromAtoB(board.PositionArray[i][d].position,rotations[c])

                              }
                            }

                        }
                        
                    }

                }

            }
            clickMode="standby";}
    }



    console.log(z)


}


drawBoard = function(canvas)
{
    ctx = canvas.getContext("2d")
    if(canvas.width>canvas.height)
    {
        BLOCKHEIGHT= canvas.height/8
        BLOCKWIDTH = BLOCKHEIGHT
    }else{
        BLOCKWIDTH= canvas.width/8
        BLOCKHEIGHT = BLOCKWIDTH

    }

    for(i=0;i<8;i++)
    {

        for(d=0;d<8;d++)
        {
            if(i%2==0)
            {
                if(d%2==0)
                {
                    ctx.fillStyle = color1
                    ctx.fillRect(i*BLOCKWIDTH,d*BLOCKHEIGHT,BLOCKWIDTH,BLOCKHEIGHT)

                }
                else
                {
                    ctx.fillStyle = color2
                    ctx.fillRect(i*BLOCKWIDTH,(d)*BLOCKHEIGHT,BLOCKWIDTH,BLOCKHEIGHT)
                }
            }
            else
            {

                if(d%2!=0)
                {
                    ctx.fillStyle=color1
                    ctx.fillRect(i*BLOCKWIDTH,d*BLOCKHEIGHT,BLOCKWIDTH,BLOCKHEIGHT)
                }
                else
                {
                    ctx.fillStyle=color2
                    ctx.fillRect(i*BLOCKWIDTH,d*BLOCKHEIGHT,BLOCKWIDTH,BLOCKHEIGHT)
                }
            }
        }
    }

}

run = function()
{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    if(canvas.height>canvas.width)
    {
        canvas.height = canvas.width
    }
    else
    {
        canvas.width = canvas.height
    }
    board.render(canvas)


};
setInterval(run,1000/FPS)
