function keyUp(){
	pageControl.moveUp();
}
function keyRight(){
	pageControl.moveRight();
}
function keyDown(){
	pageControl.moveDown();
}
function keyLeft(){
	pageControl.moveLeft();
}
function keyOk(){
	pageControl.ok();
}
function keyBack(){
	if(typeof(pageControl.keyBack) != 'undefined'){
		pageControl.keyBack();
		return;
	}
	if(typeof(closemedia) != 'undefined'){
		closemedia();
	}
	var url = getbackurl();
	if(url){
		window.location=url;
	}	
}