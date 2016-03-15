//ISM_lab1_vodich_ivan

//Осуществить моделирование непрерывной, равномерно распределенной на полуинтервале [0, 1) случайной величины.

	function SequenceOfBSV(){
		this.M = Math.pow(2, 6);
		this.lengthOfX = this.M - 1;
		this.massive = []; 
	};

	SequenceOfBSV.prototype.mod = function (z, M) {
		return  z - M * Math.trunc(z / M);
	};

	SequenceOfBSV.prototype.func_x = function(x, a, c) {
		return this.mod((a*x + c),this.M);
	};

	SequenceOfBSV.prototype.checkForCycle = function(currentLength, x) {
		var objectOfPeriod = { 
				length: 0,
				first: 0,
				last: 0
			};
		currentLength += 1;
		for (var i = 0; i < currentLength; i += 1){
			if (x[currentLength] == x[i]) {
				objectOfPeriod.first = i;
				objectOfPeriod.last = currentLength - 1;
				objectOfPeriod.length = objectOfPeriod.last - objectOfPeriod.first;
			}; 
		};
		return objectOfPeriod;
	};

	SequenceOfBSV.prototype.cutMassiveOfPeriod = function(x, objectOfPeriod) {
		x = x.slice(objectOfPeriod.first, objectOfPeriod.last);
	};

	SequenceOfBSV.prototype.massiveDivideByM = function(x) {
		for (var i = 0; i < x.length; i += 1) {
			x[i] /=  this.M;
		};
	};

	SequenceOfBSV.prototype.createMassiveOfX = function(x_0, a, c) {
		var valueForPush = x_0, 
			objectOfPeriod = {},
			x = [];
		x.push(valueForPush);

		for (var i = 0; i < this.lengthOfX - 1; i += 1) {
			valueForPush = this.func_x(x[i], a, c);
			x.push(valueForPush);
			objectOfPeriod = this.checkForCycle(i, x);
			if (objectOfPeriod.first > 0) {
				i = this.lengthOfX;
			};
		};

		//console.log(objectOfPeriod);
		this.cutMassiveOfPeriod(x, objectOfPeriod);
		this.massiveDivideByM(x);
		return x;
	};



	SequenceOfBSV.prototype.getMaxParametres = function () {
		var maxParametres = {
				x_0: 1,
				a: 1,
				c: 1,
				length: 0
			},
			x = [];
		for (var x_0 = 1; x_0 < this.M; x_0 += 1) {
			for (var a = 1; a < this.M; a += 1) {
				for (var c = 1;c < this.M; c += 1) {
					x = this.createMassiveOfX(x_0, a, c);
					if (x.length > maxParametres.length) { 
						maxParametres.x_0 = x_0;
						maxParametres.a = a;
						maxParametres.c = c;
						maxParametres.length = x.length;
					}; 
				};
			};
		};
		return maxParametres;
	};

	SequenceOfBSV.prototype.createMaxSequence = function () {
		var maxParametres = this.getMaxParametres();
		this.massive = this.createMassiveOfX(maxParametres.x_0, maxParametres.a, maxParametres.c);
    };

    SequenceOfBSV.prototype.showInInlineBlock = function () {
    	var content = document.createElement("div");
		for(var i = 0; i < this.massive.length; i += 1) {
			content.innerHTML = content.innerHTML + this.massive[i] + "<br>"; 
		};
		document.body.appendChild(content);
	};

