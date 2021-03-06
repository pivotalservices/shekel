"use strict";
shekelApp.controller('ShekelCostingController', function($scope, iaasService, planService, sizingStorageService) {

	// $scope.rampUpPlans = 5;
	//
	// $scope.vcpuPerAIOptions = [
	//         {"text": "1:1", "ratio":1},
	//         {"text": "2:1", "ratio":2},
	//         {"text": "3:1", "ratio":3},
	//         {"text": "4:1", "ratio":4},
	//         {"text": "5:1", "ratio":5},
	//         {"text": "6:1", "ratio":6},
	//         {"text": "7:1", "ratio":7},
	//         {"text": "8:1", "ratio":8},
	//         {"text": "9:1", "ratio":9},
	//         {"text": "10:1", "ratio":10}
	//       ];
	//
	// $scope.burndownModeOptions = [
	// 	    {"text": "BurnDown", "value": "gbhr"},
	// 	    {"text": "Month", "value": "date"}
	// 	  ];
	//
	// $scope.forecasting = {
	// 	vcpuPerAI: $scope.vcpuPerAIOptions[4],
	// 	profitMarginPoints: 0,
	// 	rampUpGrowth: 5,
	// 	initialPlans: 3,
	// 	burndownMonths: 36,
	// 	burndownMode: $scope.burndownModeOptions[0],
	// 	hoursInOperation: 100,
	// 	aiDeployed: 100,
	// 	forecastLength: 36,
  //       paasCost : 0,
  //       iaasCost : 0,
  //       opexCost : 0,
  //       paasMonthly : "duration",
  //       iaasMonthly : "duration",
  //       opexMonthly : "monthly"
	// };
	//
  // 	$scope.roundto2 = function(x) {
	// 	var totalX;
	// 	totalX = Math.round(x * 100) / 100;
	// 	return totalX;
	// };
	//
	// /**
	//  * Closure to enable math against a runners property.
	//  */
	// $scope.cellFunction = function(method, overhead) {
  //       var ersConfig = tileService.getTile(tileService.ersName).currentConfig;
	// 	for (var i = 0; i < ersConfig.length; ++i) {
	// 		var vm = ersConfig[i];
	// 		if ( "Diego Cell" == vm.vm) {
	// 			if ( "ephemeral_disk" == method ){
	// 				return (vm[method] * vm.instances) - (vm.ram * vm.instances) - (overhead * vm.instances);
	// 			}
	// 			else{
	// 				return (vm[method] * vm.instances) - (overhead * vm.instances);
	// 			}
	// 		}
	// 	}
	// };
	//
	// $scope.cellVcpu = function() {
	// 	return $scope.cellFunction("vcpu", 0);
	// };
	//
	// $scope.cellRam = function() {
	// 	return $scope.cellFunction("ram", 3)
	// };
	//
	// $scope.cellDisk = function() {
	// 	//MG Factor in 4 GB Used Space in /var/vcap/data
	// 	return $scope.cellFunction("ephemeral_disk", 4);
	// };
	//
	// $scope.aiAvgDisk = function ()  {
	// 	return $scope.roundto2($scope.cellDisk() / (sizingStorageService.data.aiPacks * 50));
	// };
	//
	// $scope.aiAvgRam = function ()  {
	// 	return $scope.roundto2($scope.cellRam() / (sizingStorageService.data.aiPacks * 50));
	// };
	//
	// $scope.aiAvgVcpu = function ()  {
	// 	return $scope.roundto2($scope.cellVcpu() / (sizingStorageService.data.aiPacks * 50));
	// };
	//
	// $scope.getDurationTCO = function() {
	// 	var pCost = $scope.forecasting.paasMonthly == "duration" ? $scope.forecasting.paasCost
	// 		: $scope.forecasting.paasCost * $scope.forecasting.forecastLength;
	// 	var iCost = $scope.forecasting.iaasMonthly == "duration" ? $scope.forecasting.iaasCost
	// 		: $scope.forecasting.iaasCost * $scope.forecasting.forecastLength;
	// 	var oCost = $scope.forecasting.opexMonthly == "duration" ? $scope.forecasting.opexCost
	// 		: $scope.forecasting.opexCost * $scope.forecasting.forecastLength;
	// 	return pCost + iCost + oCost;
	// };
	//
	// $scope.getMonthlyTCO = function() {
	// 	return $scope.getDurationTCO() / $scope.forecasting.forecastLength;
	// };
	//
	// /*
	//  * The following calculators assume 100% utilization. See
	//  * https://www.pivotaltracker.com/story/show/90807616 for
	//  * future plans around how we ramp up.
	//  * MG:  var gbPerHrBreakEven represents the cost to deliver GB/Hour assuming 100% utilization
	//  */
	// $scope.gbPerHrBreakEven = function() {
	// 	var perDay = ($scope.getMonthlyTCO() * 12) / 365;
	// 	var perHour = perDay / 24;
	// 	return perHour/$scope.cellRam();
	// }
	//
	// $scope.getGbPerHrWithPoints = function() {
	// 	return parseFloat($scope.gbPerHrBreakEven().toFixed(2)) +
	// 	parseFloat(($scope.gbPerHrBreakEven() * $scope.forecasting.profitMarginPoints).toFixed(2))
	// };
	//
	// //100% utilization.
	// $scope.getPayoffMonths = function () {
	// 	if ( 'date' == $scope.forecasting.burndownMode.value ) {
	// 		return $scope.forecasting.burndownMonths;
	// 	}
	// 	else {
	// 		$scope.forecasting.burndownMonths = $scope.forecasting.forecastLength;
	// 		return $scope.forecasting.forecastLength;
	// 	}
	// };
	//
	// $scope.getBurnDownModeIsTrue = function () {
	// 	if ( 'gbhr' == $scope.forecasting.burndownMode.value ) {
	// 		return true
	// 	}
	// 	else {
	// 		return false
	// 	}
	// };
	//
	// //Forecast Adjustment Points
	// $scope.getForecastAdjustment = function () {
	// 			if ( 'gbhr' == $scope.forecasting.burndownMode.value || 'date' == $scope.forecasting.burndownMode.value ) {
	// 				var baseRevenueFromRunCards = $scope.getBaseRevenueFromRunCards();
	// 				var totalRevenueShortFall = $scope.getDurationTCO() - baseRevenueFromRunCards;
	// 				var burnDownAdjustmentPoints = (totalRevenueShortFall / baseRevenueFromRunCards);
	// 				if ( isFinite(burnDownAdjustmentPoints) && totalRevenueShortFall > 0 ) {
	// 					var trAdjust = $scope.forecasting.profitMarginPoints = burnDownAdjustmentPoints;
	// 					}
	// 				else {
	// 					var trAdjust = $scope.forecasting.profitMarginPoints = 0;
	// 					}
	// 				return trAdjust
	// 			}
	// }
	//
	// //Get the Projected Base Revenue From Existing Rate Cards
	// $scope.getBaseRevenueFromRunCards = function () {
	// 	if ( $scope.runCards.length < 1 ) {
	// 		return 0;
	// 	}
	// 	else {
	// 		var trRunCards = 0;
	// 		$scope.runCards.forEach(function(runCard){
	// 			var trBaseMonthly = $scope.calculateBaseMonthly(runCard.plan);
	// 			for (var i =0; i < $scope.forecasting.burndownMonths; i++ ) {
	// 				if (runCard.runCard[i].costModelType == "Billable"){
	// 					var trRunCardIterationRevenue = runCard.runCard[i].plansInUse * trBaseMonthly;
	// 					trRunCards += trRunCardIterationRevenue;
	// 				}
	// 			}
	// 		});
	// 	}
	// 	return trRunCards;
	// }
	//
	//
	// $scope.planService = planService;
	//
	// $scope.runCards = [];
	//
	// $scope.calculateMonthly = function(plan) {
	// 	if ("Free" == plan.costModelType.value ) {
	// 		return 0;
	// 	}
	// 	if ( $scope.forecasting.profitMarginPoints > 0 ) {
	// 		var monthlyBill = $scope.calculateBaseMonthly(plan) * $scope.forecasting.profitMarginPoints;
	// 	}
	// 	else {
	// 		var monthlyBill = $scope.calculateBaseMonthly(plan);
	// 	}
	// 	return monthlyBill;
	// };
	//
	// //Necessary to help forecast adjustment
	// $scope.calculateBaseMonthly = function(plan) {
	// 	var monthlyBill = ((365/12) * 24 * ($scope.forecasting.hoursInOperation / 100))
	// 		* ((plan.memoryQuota/plan.aiMax) * (plan.aiMax * ($scope.forecasting.aiDeployed / 100)))
	// 		* $scope.gbPerHrBreakEven();
	// 	return monthlyBill;
	// };
	//
	// $scope.generateRunCard = function(plan) {
	// 	var runCard = new Array();
	// 	var plansInUse = (plan.consumption / 100) * $scope.forecasting.initialPlans;
	// 	plan.monthlyBill = $scope.calculateMonthly(plan)
	// 	var lastMonthRevenue = 0;
	// 	var runcostModelType = plan.costModelType.value;
	// 	for ( var i = 1; i <= $scope.forecasting.forecastLength; ++i ) {
	// 		var ais = plansInUse * plan.aiMax;
	// 		var revenue =  lastMonthRevenue + (plansInUse * plan.monthlyBill);
	// 		runCard.push({month: i, plansInUse: plansInUse, ais: ais, revenue: revenue, costModelType: runcostModelType});
	// 		plansInUse = plansInUse + (plansInUse * ($scope.forecasting.rampUpGrowth * .01));
	// 		lastMonthRevenue = revenue;
	// 	}
	// 	return runCard;
	// };
	//
	// $scope.buildRunCards = function(plans) {
	// 	$scope.runCards = new Array();
	// 	for ( var i = 0; i < plans.length; ++i ) {
	// 		$scope.runCards.push({ plan:plans[i], name:plans[i].name, runCard:$scope.generateRunCard(plans[i])});
	// 	}
	// 	$scope.getForecastAdjustment();
	// 	$scope.markupRuncard();
	// 	$scope.markupPlans ();
	// };
	//
	// //This could be optimized to not generate everything every time.
	// $scope.$watchCollection('planService.getPlans()', function(newPlans, oldPlans) {
	// 	$scope.buildRunCards(newPlans);
	// 	for ( var i = 0; i < planService.getPlans().length; ++i) {
	// 		var expr = 'planService.getPlans()[' + i + ']';
	// 		$scope.$watch(expr, function(newPlan, oldPlan) {
	// 			$scope.buildRunCards(planService.getPlans());
	// 		}, true);
	// 	}
	// });
	//
	// /**
	//  * Watch all forecasting inputs to update the rate cards.
	//  */
	// [
	//  'forecasting.rampUpGrowth',
	//  'forecasting.initialPlans',
	//  'forecasting.burndownMonths',
	//  'forecasting.paasMonthly',
	//  'forecasting.iaasMonthly',
	//  'forecasting.opexMonthly',
	//  'forecasting.forecastLength'
	// ].forEach(function(e,l,a) {
	// 	$scope.$watch(e, function(newValue, oldValue) {
	// 		$scope.buildRunCards(planService.getPlans());
	// 	});
	// });
	//
	// $scope.dropDownTriggerRuncard = function() {
	// 	if ( 'gbhr' == $scope.forecasting.burndownMode.value ) {
	// 		$scope.forecasting.burndownMonths = $scope.forecasting.forecastLength;
	// 	}
	//
	// 	$scope.buildRunCards(planService.getPlans());
	// };
	//
	// $scope.calculatePayoffWithPlans = function() {
	// 	var month = 0;
	// 	var tco = $scope.getDurationTCO();
	// 	for (; month < $scope.forecasting.forecastLength ; ++month) {
	// 		var sum = 0;
	// 		for(var i = 0; i < $scope.runCards.length; ++i ) {
	//
	// 				if ($scope.runCards[i].plan.costModelType.value == "Billable"){
	// 				sum += $scope.runCards[i].runCard[month].revenue
	// 					}
	// 			if ( sum > tco ) {
	// 				return month;
	// 			}
	// 		}
	// 	}
	// 	return -1;
	// };
	//
	// $scope.totalProfit = function () {
	// 	var lastMonthTotal = 0;
	// 	$scope.runCards.forEach(function(runCard) {
	// 		lastMonthTotal += runCard.runCard[$scope.forecasting.forecastLength -1 ].revenue;
	// 	});
	// 	return lastMonthTotal - $scope.getDurationTCO();
	//
	// };
	//
  //   /*
  //   This function checks each Runcard over each month for over consumption of the IaaS
  //    */
  //   $scope.markupRuncard = function() {
  //       for (var i =0; i < $scope.forecasting.forecastLength; i++ ) {
	//
  //       			var consumedRam = 0;
	// 	            var consumedVCPU = 0;
	// 	            var consumedDisk = 0;
	// 	            var rollingRevenueAdjust = 0;
	//
	//
	// 	            $scope.runCards.forEach(function(runCard) {
	// 	                var runCardForMonth = runCard.runCard[i];
	// 	                var runCardIaasReservation = runCard.plan.consumption;
	// 	                var runHasIaaS = true;
	// 	                consumedRam = runCardForMonth.ais * runCard.plan.maxInstanceMem;
	// 	                consumedVCPU = runCardForMonth.ais * $scope.aiAvgVcpu();
	// 	                consumedDisk = runCardForMonth.ais * $scope.aiAvgDisk();
	// 	                //Adjust RunCard if profitMarginPoints > 0
	// 	                if ($scope.forecasting.profitMarginPoints > 0 ){
	// 	                	var h = i-1;
	// 	                	runCardForMonth.revenue =  ((runCardForMonth.ais * (runCard.plan.memoryQuota/runCard.plan.aiMax)) *
	// 	                								((365/12) * 24 * ($scope.forecasting.hoursInOperation / 100))) * $scope.getGbPerHrWithPoints();
	// 	                	if (h >= 0) {
	// 	                		runCardForMonth.revenue = runCardForMonth.revenue + runCard.runCard[h].revenue;
	// 	                	}
	// 	                }
	// 	                runCardForMonth.oversubscribed = new Array();
	// 	                if (consumedRam >= ($scope.cellRam() * ( runCardIaasReservation * .01))) {
	// 	                    runCardForMonth.oversubscribed.push("RAM");
	// 	                    runHasIaaS = false;
	// 	                }
	// 	                if ( consumedVCPU >= ($scope.cellVcpu() * ( runCardIaasReservation * .01))) {
	// 	                	runCardForMonth.oversubscribed.push("VCPU");
	// 	                    runHasIaaS = false;
	// 	                }
	// 	                if (runCardForMonth.ais >= (sizingStorageService.getAiPacks() * 50) * (runCardIaasReservation * .01)) {
	// 	                    runCardForMonth.oversubscribed.push("AI");
	// 	                    runHasIaaS = false;
	// 	                }
	// 	                if ( consumedDisk > ( $scope.cellDisk() * ( runCardIaasReservation * .01))) {
	// 	                    runCardForMonth.oversubscribed.push("Disk");
	// 	                    runHasIaaS = false;
	// 	                }
	// 	                if ( runHasIaaS == true ) {
	// 	                    runCardForMonth.oversubscribed.push("IaaS Available");
	// 	                }
	//
	// 	            });
	//
  //       }
  //   };
	//
  //   $scope.markupPlans = function() {
  //   	var markupPlans = planService.getPlans();
  //   	for(var i = 0; i < markupPlans.length; ++i ) {
  //   		markupPlans[i].monthlyBill = $scope.calculateBaseMonthly(markupPlans[i]) * $scope.forecasting.profitMarginPoints;
  //   	}
  //   };

});
