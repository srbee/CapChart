
//changes made on 11 June Morning Second Version
// created a seperate function "phasorDiagram()"" for drawing phasor diagram
// created a seperate function "myInit()"" for initialization
// called the myInit() when Reset button is clicked
// at the end of each function manipulating the lengths and angles 
// of the phasor diagram 
//12 June : Inhibited all button clicks which are not sequential
// hence reducing the possibility of crash due to random  clicks
function setup() {
  var canvas=createCanvas(800, 1000);
  canvas.parent('sketchDiv')
  angleMode(DEGREES);
  //frameRate(50)
  myInit()
  
  
}//end of mandatory function setup()

function myInit(){
  frameRate(50)
 b1=0;b2=0;b3=0;b4=0;b5=0;b6=0;//button pressed flags
  
  myAng=-90;mySwitch=0
  myScaling=5;
  xy=[0 ,0];// x ,y coods of origin of phasor diag
  //xy[0]=0 and xy[1]=0 <-- Origin at centre 
  //since translate(width/2,height/2) is used
  d=1//ang increment
  //frameRate(1)
  strokeWeight(2);textSize(20)
  V_mag=100;V_ang=0;V_legend='V'; E_legend='E'
  
  I_mag=10;X=15
  I_ang=-30;//phase angle of current wrt V
  I_color='green';I_legend='Ia';IX_legend="Ia*Xd"
  bX=30;bY=460
  button1 = createButton('Rotate ACW by 90 deg');
  button1.position(bX, bY);
  button1.style('background-color', 'yellow');
  button1.mousePressed(rotACW90);
  
  button2 = createButton('Flip the diagram vertically');
  button2.position(bX, bY+30);
  //button2.style('background-color', 'yellow');
  button2.mousePressed(myFlip);
  
  button3 = createButton('Scale by multiplying by V/Xd');
  button3.position(bX, bY+60);
  //button3.style('background-color', 'yellow');
  button3.mousePressed(myScale);
  
  button4 = createButton('Create Capability Chart');
  button4.position(bX, bY+90);
  //button4.style('background-color', 'yellow');
  button4.mousePressed(myCreateChart);
  
  button5 = createButton('Fill-in the Chart');
  button5.position(bX, bY+120+15);
  //button5.style('background-color', 'yellow');
  button5.mousePressed(myFill);
  
  button6 = createButton('Reset ');
  button6.position(bX, bY+120+15+30);
  //button6.style('background-color', 'yellow');
  button6.mousePressed(myReset); 
}//end of function myInit()


function draw() {
  background('papayawhip');
  //translate(width/3,height/5);
  translate(0.3*width,height/5);
  // above statement changes origin to width/2,height/5
  circle(0,0,10)
  phasorDiagram()
  
}//  end of draw()

function phasorDiagram(){
  background('papayawhip');
  //startX=0 ;startY=0
  nx=xy[0] ; ny=xy[1]
  
  // Note origin is at (width/2,height/5) due to translate(width/2,height/5)
  
  xy1=phasor(nx,ny,V_mag,V_ang,'red',V_legend,'center')//V phasor
  xy5=phasor(nx,ny,I_mag*5,I_ang,I_color,I_legend,'center')// I phasor
  xy4=phasor(xy1[0],xy1[1],(I_mag*X),I_ang+90,'magenta',IX_legend,'center')//IX drop
  xxx=xy4[0]-nx;yyy=xy4[1]-ny
  E_mag=sqrt(xxx*xxx+yyy*yyy)
  //E_mag= sqrt(xy4[0]*xy4[0]+xy4[1]*xy4[1])
  delta=atan2(yyy,xxx)
  //delta=atan2(xy4[1],xy4[0])
  phasor(nx,ny,E_mag,-delta,'blue',E_legend,'center')// E phasor
  
  
}// end of function phasor diagram

function phasor(sx,sy,M,theta,rang,legend,myPos){
  //==================================================
  //draws arrow from (sx,sy) of length M @/_theta
  //M : magnitude of phasor
  //theta: angle of phasor with horizontal 
  //rang:foreground color
  //legend: legend to be printed at the centre of phasor
  //and returns (x,y) coods of end point
  //angleMode(DEGREES) required 
  //myPos:'center' if legend at centre 'tip' if at tip of phsr
  //====================================================
  
  
  stroke(''+rang)
  
  a=theta
  m=M
  x1=sx ; y1=sy
  x2=x1+M*cos(theta); y2=y1-M*sin(theta)
  turnBack=20
  aL=0.041//arrowLength=0.1
  aPI=a+180;//turn back
  a1=aPI-turnBack ; a2=aPI+turnBack;
  // advance and retard by 30 deg for good looking arrow
  x3=x2+aL*M*cos(a1);y3=y2-aL*M*sin(a1);
  x4=x2+aL*M*cos(a2);y4=y2-aL*M*sin(a2);
  
  line(x1,y1,x2,y2);
  line(x2,y2,x3,y3);
  line(x2,y2,x4,y4);
 
  if (myPos=='center'){

  text(legend,((x1+x2)/2),((y1+y2)/2))
  }else{text(legend,x2,y2)}
   
  
  return[x2,y2]
};// end of function phasor()

function rotACW90(){
  //Rotates the entire phasor diagram by 90 deg ACW
  //print('I am inside rotACW90()')
  //print('b1= ',b1)
  //xy=[0 ,0];
  if(b1==1){
    print('since b==1 returning')
    return}
  if(b1==0)
  {
    b1=1
    button1.style('background-color', '');
    button2.style('background-color', 'yellow');
    V_ang=V_ang+90
    I_ang=I_ang+90
    phasorDiagram()
  }// end of if
//print('b1= ',b1)
  
}//end of function rotACW90()

function myFlip(){
  //flips the diag vertically
  
  if( (b2==0) && (b1==0) ){return};// trap inadverdent clicks
  
  if(b2==1){return}
  if (b2==0){b2=1}
  if(b2==1){
    button2.style('background-color', '');
    button3.style('background-color', 'yellow');
  }
  if(b1==1){
  I_ang=180-I_ang
  X=-X
     }//end of if
  phasorDiagram()
}//end of function myFlip


function myScale(){
  //translate(width,height/1.2);
  
  if( (b3==0) && (b2==0) ){return};// trap inadverdent clicks
                           
  if(b3==1){return}
  if(b3==0){b3=1}
  xy=[0 ,150];//14 june 2021          
  if(b3==1){
    button3.style('background-color', '');
    button4.style('background-color', 'yellow');
  }//end of if
            
  if(b2==1){
  
  V_mag=(((V_mag*V_mag)/X)/myScaling)*(-1)
  I_mag=(I_mag*(-V_mag/X))/myScaling
  I_color='papayawhip'
  I_legend=''
  V_legend='V*V/Xd'
  IX_legend='V*Ia'
  E_legend='E*V/Xd'
  noLoop();
  //this position of noLoop() was discovered after lot of struggle
  //frameRate(1)
}
  phasorDiagram()
}//end of myScale()

 
function myCreateChart(){
  background('papayawhip');
   
  if( (b4==0) && (b3==0) ){return};// trap inadverdent clicks
                           
  if(b4==1){return}
  if(b4==0){b4=1}
  if(b4==1){
    button4.style('background-color', '');
    button5.style('background-color', 'yellow');
  }
   xy=[0 ,250];//14 June 2021
   xcod1=0;ycod1=V_mag-xy[1];
   k=0
  for(myAng=-90;myAng<91;myAng=myAng+5)
   {
    k=k+1
    //phasor(sx   ,sy    ,M       ,theta,rang     ,legend,myPos) 
      if(  (k%9)==0     )     
    {phasor(xcod1,-ycod1,-I_mag*X,myAng,'magenta','V*Ia','tip')}
      else{phasor(xcod1,-ycod1,-I_mag*X,myAng,'magenta','','tip') }
    }//end of for loop for circle of Ia Xd
     
   xcod2=0;ycod2=-xy[1];
   
   for(myAng=-10;myAng<91;myAng=myAng+3)
   {
     push()
     textSize(10)
     k=k+1
     if((k%5 )==0) {phasor(xcod2,-ycod2,E_mag,myAng,'blue','E * V / Xd','tip')}
     else{phasor(xcod2,-ycod2,E_mag,myAng,'blue','','tip') }
     pop()
   }//end of for loop for circle of EV/Xd
  
  myDrawAxes()
 // myFill()
  //myQlimit()
}//end of function myCreateChart()

function myFill(){
  
  
  if( (b5==0) && (b4==0) ){return};// trap inadverdent clicks
  
  if(b5==1){return}
  if(b5==0){b5=1}
  if(b5==1)
  {
  button5.style('background-color', '');
  button6.style('background-color', 'yellow'); 
  push()
  //blendMode(BURN)
  fill([255,255,0,150])
  arcX1=0,arcY1=-V_mag+xy[1]
  arcW1=2*I_mag*X;arcH1=arcW1,
  arcStart1=-90;arcStop1=90
  arc(arcX1,arcY1,arcW1,arcH1,arcStart1,arcStop1,PIE)
  pop()
  push()
  fill([255,0,255,70])
  arcX2=0,arcY2=xy[1]
  arcW2=2*E_mag;arcH2=arcW2,
  arcStart2=-90;arcStop2=0
  arc(arcX2,arcY2,arcW2,arcH2,arcStart2,arcStop2,PIE)
  pop()
  myQlimit()
  modArea()
  }//end of if
  
}//end of function myFill()
  
function myReset(){
  b1=0;b2=0;b3=0;b4=0;b5=0;b6=0;//button pressed flags
  //button6.style('background-color', ''); 
  //button1.style('background-color', 'yellow'); 
  //background('papayawhip');
  
  //frameRate(50)
  //background('papayawhip')
  myInit()
  phasorDiagram()
  //setup()
 
 // draw()
}//end of function myReset()

function myDrawAxes(){
  //phasor(sx,sy,M,theta,rang,legend)
  push()

  strokeWeight(1)
  textSize(20)
  
  
  phasor(0,(xy[1]-V_mag),1.0*(width/2),0,'black','P (Gen.) ','tip')
  phasor(0,xy[1]-V_mag,width/3.5,180,'black',' P (Motor)','tip')
  
  phasor(0,V_mag,0.6*(height/2),90,'black','+Q (Reactive Power)','tip')
  phasor(0,V_mag,0.6*(height/2),-90,'black','-Q(Reactive Power)','tip')
  pop()
}//end of function myDrawAxes()

function myQlimit(){
  push()
  stroke('black')
  strokeWeight(4)
  xx1=0   ;yy1=-V_mag/10;
  xx2=255 ;yy2=-(V_mag/10+(0.6*V_mag/2))
  yy1=yy1+xy[1]
  yy2=yy2+xy[1]
  line(xx1,yy1,xx2,yy2)
  pop()
  push()
  stroke('black')
  text('Negative Q limit',-160,xy[1]/1.1)
  text('Spec. by manuf.',-160,xy[1])
  pop()
  myText()
}//end of function Q limit

function myText(){
  
  text('Capability Chart',25,-height/2.2)
  push()
  stroke('magenta')
  text('------- Armature Current Limit',-260,-height/3.1)
  pop()
  push()
  stroke('blue')
  text('------- Field Current Limit',-220,-height/3.5)
  text('<><>Based on: ',-width/5,0.5*(height))
  text('        W.D.Stevenson,JR. and J.J.Grainger , Power System Analysis, ',-width/5,0.53*(height))
  
  text('        Tata McGraw-Hill 2003 [ pp110-113 ] ',-width/5,0.56*(height))
  pop()
 // myFill
  
}//end of function myText

                           
                           
                           
function modArea(){
// trying to exclude area below the under-excitation line 
  //arc(x,y,w,h,start,stop,PIE)
  myX=0   ;myY=-V_mag/10+xy[1];
  fill([255,255,0,100])
  noStroke()
  arc(myX,myY,550,300,-09,90,PIE)
  
  
}//end of function modArea()
 

 
