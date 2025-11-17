# ICIProject

# USE : Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# To allow the IDE to use env




body {
  background: #111;
  background: black;
}



.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  -webkit-animation: glow 3s linear 0s infinite alternate;
}

.particles {
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
  
}

.rotate {
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  width: 10px;
  height: 10px;
}

.angle {
  position: absolute;
  top: 0;
  left: 0;
}

.size {
  position: absolute;
  top: 0;
  left: 0;
}

.position {
  position: absolute;
  top: 0;
  left: 0;
}

.pulse {
  position: absolute;
  top: 0;
  left: 0;
}

.particle {
  position: absolute;
  top: calc(50% - 5px);
  left: calc(50% - 5px);
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.rotate {
  -webkit-animation: rotate 20s linear 0s infinite alternate;
}

.pulse{
  -webkit-animation: pulse 1.5s linear 0s infinite alternate;
}


@-webkit-keyframes glow {
  0% {
    transform: rotate(0deg);
    box-shadow: 0 0 60px 20px #56bcf9, 25px 15px 50px 10px #fff, -5px -25px 30px 5px #fff;
  }
  100% {
        transform: rotate(5deg);
    box-shadow: 0 0 90px 20px #56bcf9, 35px 20px 40px 10px #fff, -30px -30px 40px 5px #fff;
  }
}

@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes angle {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes size {
  0% {
    -webkit-transform: scale(.2);
  }
  100% {
    -webkit-transform: scale(.6);
  }
}

@-webkit-keyframes position {
  0% {
    -webkit-transform: translate3d(0,0,0);
    opacity: 1;
  }
  50 %{
    opacity: 1;
  }
  100% {
    -webkit-transform: translate3d(100px,100px,0);
    opacity: 0;
  }
}

@-webkit-keyframes pulse {
  0% {
    -webkit-transform: scale(1);
  }
  100% {
    -webkit-transform: scale(.5);
  }
}

@-webkit-keyframes particle {
  0% {
    box-shadow: inset 0 0 20px 20px #0079e8, 0 0 50px 10px #0079e8, inset 0 0 80px 80px #269aff;
  }
  33.33% {
    box-shadow: inset 0 0 20px 20px #0079e8, 0 0 130px 10px #0079e8, inset 0 0 50px 50px #269aff;
  }
  33.34% {
    box-shadow: inset 0 0 20px 20px #2693ff, 0 0 50px 10px #2693ff, inset 0 0 80px 80px #52abff;
  }
  66.66% {
    box-shadow: inset 0 0 20px 20px #2693ff, 0 0 130px 10px #2693ff, inset 0 0 50px 50px #52abff;
  }
  66.67% {
    box-shadow: inset 0 0 20px 20px #485fe8, 0 0 50px 10px #485fe8, inset 0 0 80px 80px #7d71e8;
  }
  100% {
    box-shadow: inset 0 0 20px 20px #485fe8, 0 0 130px 10px #485fe8, inset 0 0 50px 50px #7d71e8;
  }
}



.rotate .angle:nth-child(1){
  /* change the angle every 2 seconds */
  -webkit-animation: angle 10s steps(5) 0s infinite;
}
.rotate .angle:nth-child(1) .size{
  /* change the size of the particle every 2 seconds */
  -webkit-animation: size 10s steps(5) 0s infinite;
}
.rotate .angle:nth-child(1) .particle{
  /* animate the glow and change the color every 2 seconds */
  -webkit-animation: particle 6s linear infinite alternate;
}
.rotate .angle:nth-child(1) .position{
  /* animate the fly out of the particle and its fade out at the end */
  -webkit-animation: position 2s linear 0s infinite;
}



.rotate .angle:nth-child(2){
  /* change the angle every 2 seconds */
  -webkit-animation: angle 4.95s steps(3) -1.65s infinite;
}
.rotate .angle:nth-child(2) .size{
  /* change the size of the particle every 2 seconds */
  -webkit-animation: size 4.95s steps(3) -1.65s infinite alternate;
}
.rotate .angle:nth-child(2) .particle{
  /* animate the glow and change the color every 2 seconds */
  -webkit-animation: particle 4.95s linear -3.3s infinite alternate;
}
.rotate .angle:nth-child(2) .position{
  /* animate the fly out of the particle and its fade out at the end */
  -webkit-animation: position 1.65s linear 0s infinite;
}


.rotate .angle:nth-child(3){
  /* change the angle every 2 seconds */
  -webkit-animation: angle 13.76s steps(8) -6.88s infinite;
}
.rotate .angle:nth-child(3) .size{
  /* change the size of the particle every 2 seconds */
  -webkit-animation: size 6.88s steps(4) -5.16s infinite alternate;
}
.rotate .angle:nth-child(3) .particle{
  /* animate the glow and change the color every 2 seconds */
  -webkit-animation: particle 5.16s linear -1.72 infinite alternate;
}
.rotate .angle:nth-child(3) .position{
  /* animate the fly out of the particle and its fade out at the end */
  -webkit-animation: position 1.72s linear 0s infinite;
}

.rotate .angle:nth-child(5) .position{
  /* animate the fly out of the particle and its fade out at the end */
  -webkit-animation: position 2.45s linear 0s infinite;
}