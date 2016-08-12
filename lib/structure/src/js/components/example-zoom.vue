<template>
	<s-creen>

		<input id="i1" name="doot" type="radio" checked>
		<label for="i1"></label>
		<input id="i2" name="doot" type="radio">
		<label for="i2"></label>
		<input id="i3" name="doot" type="radio">
		<label for="i3"></label>
		<input id="i4" name="doot" type="radio">
		<label for="i4"></label>
		<input id="i5" name="doot" type="radio">
		<label for="i5"></label>
		<input id="i6" name="doot" type="radio">
		<label for="i6"></label>
		<input id="i7" name="doot" type="radio">
		<label for="i7"></label>

		<z-oom>
			<img src="../../image/example/bd1b.jpg" alt="">
			<img src="../../image/example/bd2b.jpg" alt="">
			<img src="../../image/example/bd3b.jpg" alt="">
			<img src="../../image/example/bd4b.jpg" alt="">
			<img src="../../image/example/bd5b.jpg" alt="">
			<img src="../../image/example/bd6b.jpg" alt="">
			<img src="../../image/example/bd7b.jpg" alt=""></z-oom>

	</s-creen>
</template>

<style>
	html {
		overflow: hidden;
		touch-action: none;
		content-zooming: none;
	}

	body {
			position: absolute;
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			background: #000;
	}

	s-creen {
			position: absolute;
			width: 100vw;
			height: 100vh;
			max-width: 640px;
			max-height: 480px;
			margin: auto;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
	}

	z-oom {
			position: absolute;
			width: 100%;
			height: 100%;
			margin: auto;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			transition: transform 2s ease-in-out 0s;
			transform: scale3d(0.000729, 0.000729, 1);
	}

	s-creen img {
			position: absolute;
			width: 640px;
			height: 480px;
			top: 50%;
			left: 50%;
			margin-left: -320px;
			margin-top: -240px;
	}

	z-oom img:nth-child(7) {transform: scale3d(1, 1, 1);}
	z-oom img:nth-child(6) {transform: scale3d(3.3333, 3.3333, 1);}
	z-oom img:nth-child(5) {transform: scale3d(11.1111, 11.1111, 1);}
	z-oom img:nth-child(4) {transform: scale3d(37.037, 37.037, 1);}
	z-oom img:nth-child(3) {transform: scale3d(123.4567, 123.4567, 1);}
	z-oom img:nth-child(2) {transform: scale3d(411.5226, 411.5226, 1);}
	z-oom img:nth-child(1) {transform: scale3d(1371, 1371, 1);}

	s-creen input[type="radio"] + label {
			position: absolute;
			bottom: 10px;
			width: 8%;
			height: 30px;
			cursor: pointer;
			background: #fff;
			margin: 0;
			z-index: 100;
			border-radius:5px;
			outline: none;
	}

	#i1 + label {left: 16%;}
	#i2 + label {left: 26%;}
	#i3 + label {left: 36%;}
	#i4 + label {left: 46%;}
	#i5 + label {left: 56%;}
	#i6 + label {left: 66%;}
	#i7 + label {left: 76%;}

	s-creen > input {
		position:absolute;
		top:-1000px;
	}

	s-creen > input:checked + label {background: #f80;}

	#i1:checked ~ z-oom {transform: scale3d(0.000729, 0.000729, 1);}
	#i2:checked ~ z-oom {transform: scale3d(0.00243, 0.00243, 1);}
	#i3:checked ~ z-oom {transform: scale3d(0.0081, 0.0081, 1);}
	#i4:checked ~ z-oom {transform: scale3d(0.027, 0.027, 1);}
	#i5:checked ~ z-oom {transform: scale3d(0.09, 0.09, 1);}
	#i6:checked ~ z-oom {transform: scale3d(0.3, 0.3, 1);}
	#i7:checked ~ z-oom {transform: scale3d(1, 1, 1);}
</style>

<script></script>