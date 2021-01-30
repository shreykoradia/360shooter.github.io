const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const scoreTracker = document.getElementById('scoreTracker');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player{
	constructor(x,y,radius,color){
		this.x = x ;
		this.y = y;
		this.radius = radius;
		this.color  = color;
	}

	draw(){
		ctx.beginPath()
		ctx.arc(this.x ,this.y , this.radius,0, Math.PI*2 , false);
		ctx.fillStyle = this.color ;
		ctx.fill();
	}
}

class Projectile {
	constructor(x, y, radius, color, velocity){
		this.x = x ;
		this.y = y;
		this.radius = radius;
		this.color  = color;
		this.velocity = velocity;
	}

	draw(){
		ctx.beginPath()
		ctx.arc(this.x ,this.y , this.radius,0, Math.PI*2 , false);
		ctx.fillStyle = this.color ;
		ctx.fill();
	}

		update(){
			this.draw();
			this.x = this.x + this.velocity.x ;
			this.y = this.y + this.velocity.y ;
		}

}


class Enemy {
	constructor(x, y, radius, color, velocity){
		this.x = x ;
		this.y = y;
		this.radius = radius;
		this.color  = color;
		this.velocity = velocity;
	}

	draw(){
		ctx.beginPath()
		ctx.arc(this.x ,this.y , this.radius,0, Math.PI*2 , false);
		ctx.fillStyle = this.color ;
		ctx.fill();
	}

		update(){
			this.draw();
			this.x = this.x + this.velocity.x ;
			this.y = this.y + this.velocity.y ;
		}

}







const x = canvas.width /2 ;
const y = canvas.height /2;

const player = new Player(x,y,30,'white');
player.draw();
const projectiles =[];
const enemies =[] ;

function spawnEnemies() {
	setInterval(()=>{
		const radius = Math.random() * (30-4) + 4 ;

		let x ;
		let y ;
		if(Math.random()<0.5) {
			 x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius ;
			 y = Math.random() * canvas.height ;
		}
		else{
			 x = Math.random() * canvas.width ;
			 y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius ;
		}
		
		const color = `hsl(${Math.random() * 360},50%,50%)`;
			 
			
const angle = Math.atan2(
	canvas.height /2 - y , canvas.width / 2 -x);

const velocity = {
	x: Math.cos(angle) *1,
	y: Math.sin(angle) * 1
}; 

		enemies.push(new Enemy(x, y, radius, color, velocity));



	},2000);
}

let animationId ;
let score = 0 ;

function animate(){
	animationId = requestAnimationFrame(animate)
	ctx.fillStyle ='rgba(0,0,0,0.1)';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	player.draw();

	// console.log('go');
	// 	projectile.draw();
	// 	projectile.update();
	projectiles.forEach((projectile , index) => {
		projectile.update();
		if(projectile.x + projectile.radius < 0 ||
			projectile.x - projectile.radius > canvas.width ||
			projectile.y + projectile.radius < 0 ||
			projectile.y - projectile.radius > canvas.height
			) {
			setTimeout(()=>{
				projectiles.slice(index , 1 );
			},0);
		}	

		enemies.forEach((enemy , index)=>{
			enemy.update();

	const dist = Math.hypot(player.x - enemy.x , player.y - enemy.y );
	// end game 
if (dist - enemy.radius - player.radius < 1){
	cancelAnimationFrame(animationId)
}		

			projectiles.forEach((projectile, projectileIndex)=>{
			const dist = Math.hypot(projectile.x - enemy.x , projectile.y - enemy.y );
		
//when projectiles touch enme
			if(dist - enemy.radius - projectile.radius < 1) {
				//score incrase
				score +=  100;
				scoreTracker.innerHTML = score;
				console.log(score);

			if (enemy.radius -10 > 10){
				enemy.radius -=10 ;
					setTimeout(()=>{
					projectiles.splice(projectileIndex , 1);
				}, 0);
					
			}	
			else{
						setTimeout(()=>{
					
					enemies.splice(index , 1);
					projectiles.splice(projectileIndex , 1);
				}, 0);
						score += 100;
				scoreTracker.innerHTML = score;
				console.log(score);
			}
			}
			});
		})


	})

}

addEventListener('click',(event) => {
	
const angle = Math.atan2(
	event.clientY- canvas.height /2 , event.clientX - canvas.width / 2);

const velocity= {
	x: Math.cos(angle) * 4 ,
	y: Math.sin(angle) * 4
}


projectiles.push(new Projectile(canvas.width /2 , canvas.height /2 , 5 ,'white',velocity))

});

animate();
spawnEnemies();

