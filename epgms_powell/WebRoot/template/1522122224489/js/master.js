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
	//var url = getbackurl();
	if(pageControl.keyBack){
		pageControl.keyBack();
		return;
	}
	if(closemedia){
		closemedia();
	}
	var url = getbackurl();
	if(url){
		window.location=url;
	}
}