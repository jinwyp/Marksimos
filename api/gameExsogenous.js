exports.getExogenousByPeriod = function(period) {
	var result = {};
	var BSIP,SGR;
	switch (period) {
		case -3:
			BSIP = [[20.0, 20.0],[20.0, 30.0],[26.0, 24.0],[23.0, 28.0],[41.0, 41.0],[40.0, 27.0]];
			SGR = [0.015, 0.015, 0.025, 0.024, 0.022, 0.023];
			break;
		case -2:
			BSIP = [[21.0, 22.0],[21.0, 35.0],[27.0, 26.0],[25.0, 31.0],[44.0, 44.0],[43.0, 29.0]];
			SGR = [0.014, 0.015, 0.025, 0.025, 0.022, 0.023];
			break;
		case -1:
			BSIP = [[22.0, 23.0],[22.0, 40.0],[29.0, 28.0],[28.0, 33.0],[48.0, 48.0],[47.0, 31.0]];
			SGR = [0.013, 0.015, 0.026, 0.024, 0.022, 0.023];
			break;
		case 0:
			BSIP = [[24.0, 24.0],[24.0, 45.0],[32.0, 30.0],[32.0, 36.0],[53.0, 53.0],[52.0, 33.0]];
			SGR = [0.012, 0.015, 0.026, 0.024, 0.022, 0.023];
			break;
		case 1:
			BSIP = [[25.0, 26.0],[26.0, 50.0],[35.0, 32.0],[36.0, 39.0],[58.0, 58.0],[57.0, 35.0]];
			SGR = [0.011, 0.015, 0.025, 0.026, 0.022, 0.023];
			break;
		case 2:
			BSIP = [[26.0, 28.0],[28.0, 55.0],[38.0, 34.0],[40.0, 42.0],[63.0, 63.0],[62.0, 37.0]];
			SGR = [0.010, 0.015, 0.025, 0.026, 0.022, 0.023];

			break;
		case 3:
			BSIP = [[28.0, 30.0],[30.0, 60.0],[41.0, 36.0],[44.0, 45.0],[68.0, 68.0],[67.0, 39.0]];
			SGR = [0.009, 0.015, 0.027, 0.024, 0.023, 0.024];
			break;
		case 4:
			BSIP = [[30.0, 31.0],[32.0, 65.0],[44.0, 38.0],[48.0, 48.0],[73.0, 73.0],[72.0, 41.0]];
			SGR = [0.08, 0.015, 0.028, 0.024, 0.022, 0.023];
			break;
		case 5:
			BSIP = [[32.0, 32.0],[34.0, 70.0],[47.0, 40.0],[52.0, 51.0],[78.0, 78.0],[77.0, 43.0]];
			SGR = [0.007, 0.015, 0.028, 0.024, 0.023, 0.024];
			break;
		case 6:
			BSIP = [[34.0, 35.0], [36.0, 75.0], [50.0, 42.0], [56.0, 54.0], [83.0, 83.0], [82.0, 45.0]];
			SGR = [0.006, 0.015, 0.028, 0.024, 0.023, 0.024];
			break;
		case 7:
			BSIP = [[36.0, 36.0], [38.0, 80.0], [52.0, 44.0], [60.0, 57.0], [88.0, 88.0], [87.0, 47.0]];
			SGR = [0.005, 0.015, 0.027, 0.024, 0.023, 0.024];
			break;
		case 8:
			BSIP = [[38.0, 37.0], [40.0, 85.0], [55.0, 46.0], [64.0, 60.0], [93.0, 93.0], [92.0, 49.0]];
			SGR = [0.004, 0.015, 0.025, 0.024, 0.024, 0.025];
			break;
		case 9:
			BSIP = [[40.0, 38.0], [42.0, 90.0], [58.0, 48.0], [68.0, 63.0], [98.0, 98.0], [97.0, 51.0]];
			SGR = [0.003, 0.015, 0.025, 0.024, 0.024, 0.025];
			break;
		case 10:
			BSIP = [[42.0, 39.0], [44.0, 91.0], [60.0, 50.0], [70.0, 65.0], [99.0, 99.0], [98.0, 53.0]];
			SGR = [0.002, 0.015, 0.025, 0.024, 0.024, 0.025];
			break;
	}
	result.exo_InflationRate = 0.020;
	result.exo_DepositRate = result.exo_InflationRate + 0.01;
	result.exo_InterestRate = result.exo_DepositRate + 0.01;
	result.exo_SurchargeRate = result.exo_InterestRate + 0.03;
	result.exo_TaxRate = 0.200;
	result.exo_SegmentsIdealPoints = BSIP;
	result.exo_SegmentGrowthRate = SGR;
	if (period <= 0) {
		result.exo_BudgetPerPeriod = 520.0;
		result.exo_IngredientsCost = 0.46;
		result.exo_TechnologyExpense = 0.15;
		result.exo_LogisticsFixedCosts = 1.0;
	} else {
		result.exo_BudgetPerPeriod = 520.0 * Math.pow((1.0 + result.exo_InflationRate), period);
		result.exo_IngredientsCost = 0.46 * Math.pow((1.0 + result.exo_InflationRate), period);
		result.exo_TechnologyExpense = 0.15 * Math.pow((1.0 + result.exo_InflationRate), period);
		result.exo_LogisticsFixedCosts = 1.0 * Math.pow((1.0 + result.exo_InflationRate), period);
	}
	return result;
}
/*
-3
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0149999996647239,0.0149999996647239,0.025000000372529,0.0240000002086163,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[0,0,1.5694542800438E-43,0,0,3.66161835279455E33],"exo_IngredientsCost":0.46000000834465,"exo_LogisticsFixedCosts":1,"exo_TechnologyExpense":0.150000005960464,"exo_BudgetPerPeriod":520,"exo_SegmentsIdealPoints":[[20,20],[20,30],[26,24],[23,28],[41,41],[40,27]]}
-2
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0140000004321337,0.0149999996647239,0.025000000372529,0.025000000372529,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[4.48415508583941E-44,7.37864916777947E-40,9.47742432454346E-38,0,1.7417411236356E-39,11385500672],"exo_IngredientsCost":0.46000000834465,"exo_LogisticsFixedCosts":1,"exo_TechnologyExpense":0.150000005960464,"exo_BudgetPerPeriod":520,"exo_SegmentsIdealPoints":[[21,22],[21,35],[27,26],[25,31],[44,44],[43,29]]}
-1
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0130000002682209,0.0149999996647239,0.0260000005364418,0.0240000002086163,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[0,1.74219514433804E-39,3.76008038969919E33,6.59728931713783E22,0,3.66165239614563E33],"exo_IngredientsCost":0.46000000834465,"exo_LogisticsFixedCosts":1,"exo_TechnologyExpense":0.150000005960464,"exo_BudgetPerPeriod":520,"exo_SegmentsIdealPoints":[[22,23],[22,40],[29,28],[28,33],[48,48],[47,31]]}
0
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0120000001043081,0.0149999996647239,0.0260000005364418,0.0240000002086163,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[1.74245858844934E-39,1.74226240666433E-39,3.52585975490993E-38,11549256704,1.74226240666433E-39,3.52585975490993E-38],"exo_IngredientsCost":0.46000000834465,"exo_LogisticsFixedCosts":1,"exo_TechnologyExpense":0.150000005960464,"exo_BudgetPerPeriod":520,"exo_SegmentsIdealPoints":[[24,24],[24,45],[32,30],[32,36],[53,53],[52,33]]}
1
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0109999999403954,0.0149999996647239,0.025000000372529,0.0260000005364418,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[1.74181399115575E-39,3.65995363292672E33,1.74184762231889E-39,11385238528,4.48415508583941E-44,1.74198775216532E-39],"exo_IngredientsCost":0.469199985265732,"exo_LogisticsFixedCosts":1.01999998092651,"exo_TechnologyExpense":0.152999997138977,"exo_BudgetPerPeriod":530.400024414063,"exo_SegmentsIdealPoints":[[25,26],[26,50],[35,32],[36,39],[58,58],[57,35]]}
2
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00999999977648258,0.0149999996647239,0.025000000372529,0.0260000005364418,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[11382778880,1.74197654177761E-39,11382802432,11382810624,1.74221756511347E-39,11382820864],"exo_IngredientsCost":0.478583991527557,"exo_LogisticsFixedCosts":1.04040002822876,"exo_TechnologyExpense":0.156059995293617,"exo_BudgetPerPeriod":541.007995605469,"exo_SegmentsIdealPoints":[[26,28],[28,55],[38,34],[40,42],[63,63],[62,37]]}
3
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00899999961256981,0.0149999996647239,0.0270000007003546,0.0240000002086163,0.0230000000447035,0.0240000002086163],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[3.66167096524621E33,3.66165239614563E33,7.88742508677681E-28,0,6.46110695930887E-40,1.40129846432482E-45],"exo_IngredientsCost":0.488155692815781,"exo_LogisticsFixedCosts":1.06120800971985,"exo_TechnologyExpense":0.159181192517281,"exo_BudgetPerPeriod":551.828186035156,"exo_SegmentsIdealPoints":[[28,30],[30,60],[41,36],[44,45],[68,68],[67,39]]}
4
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0799999982118607,0.0149999996647239,0.0280000008642673,0.0240000002086163,0.0219999998807907,0.0230000000447035],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[1.00487505240303E-38,3.6597862015364E33,7.88759649454186E-28,3.6819061098196E-39,9.38840824089569E-39,1.40129846432482E-45],"exo_IngredientsCost":0.497918784618378,"exo_LogisticsFixedCosts":1.08243215084076,"exo_TechnologyExpense":0.162364825606346,"exo_BudgetPerPeriod":562.86474609375,"exo_SegmentsIdealPoints":[[30,31],[32,65],[44,38],[48,48],[73,73],[72,41]]}
5
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00700000021606684,0.0149999996647239,0.0280000008642673,0.0240000002086163,0.0230000000447035,0.0240000002086163],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[7.37864916777947E-40,9.47742432454346E-38,4.13825857290548E-39,3.65975958582556E33,3.65995920365689E33,3.65997498739239E33],"exo_IngredientsCost":0.507877171039581,"exo_LogisticsFixedCosts":1.10408079624176,"exo_TechnologyExpense":0.165612116456032,"exo_BudgetPerPeriod":574.122009277344,"exo_SegmentsIdealPoints":[[32,32],[34,70],[47,40],[52,51],[78,78],[77,43]]}
6
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00600000005215406,0.0149999996647239,0.0280000008642673,0.0240000002086163,0.0230000000447035,0.0240000002086163],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[1.74276126891763E-39,11385238528,0,3.55076923641177E-38,1.74271642736677E-39,3.65994744322652E33],"exo_IngredientsCost":0.518034696578979,"exo_LogisticsFixedCosts":1.12616240978241,"exo_TechnologyExpense":0.168924361467361,"exo_BudgetPerPeriod":585.604431152344,"exo_SegmentsIdealPoints":[[34,35],[36,75],[50,42],[56,54],[83,83],[82,45]]}
7
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00499999988824129,0.0149999996647239,0.0270000007003546,0.0240000002086163,0.0230000000447035,0.0240000002086163],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[7.37864916777947E-40,9.47742432454346E-38,4.48415508583941E-44,-4.20345940998619E17,0,1.74299108186578E-39],"exo_IngredientsCost":0.528395414352417,"exo_LogisticsFixedCosts":1.14868569374084,"exo_TechnologyExpense":0.172302857041359,"exo_BudgetPerPeriod":597.316528320313,"exo_SegmentsIdealPoints":[[36,36],[38,80],[52,44],[60,57],[88,88],[87,47]]}
8
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00400000018998981,0.0149999996647239,0.025000000372529,0.0240000002086163,0.0240000002086163,0.025000000372529],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[7.21668709127281E-43,1.40129846432482E-45,0,1.74300789744735E-39,3.66165239614563E33,1.74328255194636E-39],"exo_IngredientsCost":0.538963317871094,"exo_LogisticsFixedCosts":1.1716593503952,"exo_TechnologyExpense":0.175748899579048,"exo_BudgetPerPeriod":609.262878417969,"exo_SegmentsIdealPoints":[[38,37],[40,85],[55,46],[64,60],[93,93],[92,49]]}
9
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.00300000002607703,0.0149999996647239,0.025000000372529,0.0240000002086163,0.0240000002086163,0.025000000372529],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[0,0,1.5694542800438E-43,0,0,3.66161835279455E33],"exo_IngredientsCost":0.549742579460144,"exo_LogisticsFixedCosts":1.19509255886078,"exo_TechnologyExpense":0.179263889789581,"exo_BudgetPerPeriod":621.448120117188,"exo_SegmentsIdealPoints":[[40,38],[42,90],[58,48],[68,63],[98,98],[97,51]]}
10
{"exo_DepositRate":0.0299999993294477,"exo_SegmentGrowthRate":[0.0020000000949949,0.0149999996647239,0.025000000372529,0.0240000002086163,0.0240000002086163,0.025000000372529],"exo_InflationRate":0.0199999995529652,"exo_InterestRate":0.0399999991059303,"exo_SurchargeRate":0.0700000002980232,"exo_TaxRate":0.200000002980232,"exo_SegmentsSizes":[7.21668709127281E-43,1.40129846432482E-45,6.24509399843627E-39,0,1.74392154404609E-39,11385500672],"exo_IngredientsCost":0.560737431049347,"exo_LogisticsFixedCosts":1.21899437904358,"exo_TechnologyExpense":0.182849168777466,"exo_BudgetPerPeriod":633.877075195313,"exo_SegmentsIdealPoints":[[42,39],[44,91],[60,50],[70,65],[99,99],[98,53]]}
*/