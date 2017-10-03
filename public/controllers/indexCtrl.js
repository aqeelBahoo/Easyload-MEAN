var app = angular.module("myApp");
app.controller("myCtrl", function($scope, $http){
	clearFields();
	$scope.easyLoadRecords  = [];
//init function
	_init = function () {
		getEasyLoadRecordsFromDb();
	};

	_init();
	//add easyLoad  and save the data to db also start
	$scope.add= function(){
		if($scope.easyLoad._id){return;}
		else if(!($scope.easyLoad.number)  || !($scope.easyLoad.rupees) ){
			console.log("plzz fill the all fields");
		}
		else if ($scope.easyLoad.number && $scope.easyLoad.rupees){
			$scope.easyLoad.date = new Date().toLocaleString();
			var numinstring = $scope.easyLoad.number;
			numinstring = numinstring.toString();
			var numinslice = numinstring.slice(0,3);

			if(numinslice == "341" ||
					numinslice == "342"||
					numinslice == "343"||
					numinslice == "344"||
					numinslice == "345"||
					numinslice == "346"
			){
				$scope.easyLoad.vendor = "telenor"
			}
			else if(numinslice == "300" ||
					numinslice == "301"||
					numinslice == "302"||
					numinslice == "303"||
					numinslice == "304"||
					numinslice == "305" ||
					numinslice == "306"
			){
				$scope.easyLoad.vendor = "jazz"
			}
			else if(numinslice == "321" ||
					numinslice == "322"||
					numinslice == "323"||
					numinslice == "324"||
					numinslice == "325"||
					numinslice == "326" ||
					numinslice == "327"
			){
				$scope.easyLoad.vendor = "warid"
			}
			else if(numinslice == "311" ||
					numinslice == "312"||
					numinslice == "313"||
					numinslice == "314"||
					numinslice == "315"||
					numinslice == "316" ||
					numinslice == "317"
			){
				$scope.easyLoad.vendor = "zong"
			}
			else if(numinslice == "331" ||
					numinslice == "332"||
					numinslice == "333"||
					numinslice == "334"||
					numinslice == "335"||
					numinslice == "336" ||
					numinslice == "337"
			){
				$scope.easyLoad.vendor = "ufone"
			}

			$http.post("/easyloadList", $scope.easyLoad).then(function(res){
				$scope.easyLoadRecords.push(res.data);
				console.log(res.data);
				clearFields();
			},function(err){
				alert('something went wrong');
				console.log(err);
			});
		}
	}
	//add easyLoad end

	//remove data from database and view also start
	$scope.remove = function (databaseId, viewId) {
		$http.delete("/easyloadList/" + databaseId).then(function (res) {
					console.log("data delete successfully");
					console.log(res.data);
					console.log($scope.easyLoadRecords.splice(viewId, 1));
				},
				function(err){
					console.log("data not deleted")
				})
	}
	//remove data from database and view also end

	//edit easyload, get one data from db
	$scope.edit = function(id,index){
		$scope.easyLoad = $scope.easyLoadRecords[index];

		//$http.get("/easyloadList/" + id).then(function(res){
		//			$scope.easyLoad = res.data;
		//		},
		//		function(err){
		//			console.log("data not found");
		//		}
		//)
	}
	//edit easyload, get one data from db end

	//update data
	$scope.update = function (id) {
		if(!($scope.easyLoad.number)  || !($scope.easyLoad.rupees) ){
			console.log("plzz fill the all fields");
		}
		else{
			$http.put("/easyloadList/" + id, $scope.easyLoad).then(function(res){
						for(var i = 0; i < $scope.easyLoadRecords.length; i++){
							var record = $scope.easyLoadRecords[i];
							if(record._id == res.data._id){
								record = res.data;
								clearFields();
								break;
							}
						}
					},
					function(err){
					})
		}
	}

	//clear fields function start
	function clearFields(){
		$scope.easyLoad = {};
	}

	//clear fields function end

	//get ALL DATA FROM DATA BASE START
	function getEasyLoadRecordsFromDb(){
		$http.get("/easyloadList").then(
				function(res){
					$scope.easyLoadRecords = res.data;
					console.log("data found from data base");
					console.log(res);
				},
				function(err){
					console.log("data not found from  database something wrong");
				})
	}
	//get ALL DATA FROM DATA BASE END





	/*$scope.open = function() {
		$uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'myModalContent.html',
			controller: function ($uibModalInstance, $scope) {
				$scope.cancel = function(){
					$uibModalInstance.dismiss();
				};
				$scope.deleteGroup = function(){
					$uibModalInstance.close();
				};
			}
		}).result.then(function (){


		}, function (){

		})
	}*/









})
//controller end