var isClicked = false;
function createLoyaltyList() {
	var dataRows = [];
	for (var i = 0; i < 3; i++) {

		var row = Ti.UI.createTableViewRow({
			height : 60,
			left : 0,
			right : 0,
			selectedColor : "#FFF",
			layout:"horizontal",
			backgroundColor : "white"
		});

		var iconImg = Ti.UI.createImageView({
			left : Alloy.Globals.navigatorIconPadding,
			height : 48,
			width : 48,
			bottom : 10,
			top : 10,
			backgroundColor : "#fff",
			image : "/images/foodtruckBlack.png"
		});

		row.add(iconImg);
		
		var extView = Ti.UI.createView({
			top : 5,
			height : 50,
			layout : "vertical",
			width:150,
			textAlign:"left",
			backgroundColor : "transparent"
		});
		var titleLbl = Ti.UI.createLabel({
			top : 5,
			left:5,
			text : "Gold",
			textAlign:"left",
			font:{
				fontFamily:"Raleway",
				fontSize:18,
			},
			color : "Black",
			height : 20,
		});
		extView.add(titleLbl);
		
		var subTitleLbl = Ti.UI.createLabel({
			text : "1 sandwitch, 1 side, 1 drink",
			top:5,
			left:5,
			font:{
				fontFamily:"Raleway",
				fontSize:12
			},
			color : "Black",
			textAlign:"left",
			height : 20,
		});
		extView.add(subTitleLbl);
		var pointView = Ti.UI.createView({
			top : 5,
			height : 50,
			width:30,
			layout : "vertical",
			textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
			backgroundColor : "transparent"
		});
		var pointLbl = Ti.UI.createLabel({
			top : 5,
			text : "15",
			font:{
				fontFamily:"Raleway",
				fontSize:18,
				fontWeight:"bold"
			},
			color : "Black",
			height : 20,
		});
		pointView.add(pointLbl);
		
		var ptsLbl = Ti.UI.createLabel({
			text : "Pts",
			font:{
				fontFamily:"Raleway",
				fontSize:12
			},
			color : "#000",
			height : 20,
		});
		pointView.add(ptsLbl);
		row.add(extView);
		row.add(pointView);
		
		var rightImg = $.UI.create('ImageView', {
			left : 25,
			id : "addEdit",
			textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
			image : "/images/note.png"
		});
		if (i == 0) {
			iconImg.image = "/images/prize_gold.png";
		} else if (i == 1) {
			iconImg.image = "/images/prize_silver.png";
			subTitleLbl.text = "1 Free side";
			titleLbl.text = "Silver";
			pointLbl.text = "10";
		} else if (i == 2) {
			iconImg.image = "/images/prize_bronze.png";
			subTitleLbl.text = "1 Free drink";
			titleLbl.text = "Bronze";
			pointLbl.text = "5";
		}
		
		row.add(rightImg);

		dataRows.push(row);
	}

	$.loyaltyTable.setData(dataRows);

	$.loyaltyTable.addEventListener("click", function(e) {

		Ti.API.info('data ' + e.source + "    " + JSON.stringify(e.source));
		if ("addEdit" == e.source.id) 
		{
			//Alloy.createController('editReview').getView().open();
			var reviewControl = Alloy.createController('/foodtruck/vendor_add_loyalty').getView();
			Alloy.Globals.tabVendor.activeTab.open(reviewControl);
		}
	});
}

// create Rewars Table

function createRewardsList() {
	var dataRows = [];
	for (var i = 0; i < 10; i++) {

		var row = Ti.UI.createTableViewRow({
			height : 60,
			left : 0,
			right : 0,
			backgroundColor : Alloy.Globals.mapsBackgroundColor,
		});

		var iconImg = Ti.UI.createImageView({
			left : Alloy.Globals.navigatorIconPadding,
			height : 48,
			width : 48,
			bottom : 10,
			top : 10,
			backgroundColor : "#fff",
			image : "/images/foodtruckBlack.png"
		});

		row.add(iconImg);

		var titleLbl = Ti.UI.createLabel({
			left : 80,
			top : 5,
			text : "Pacos Tacos",
			font:{
				fontFamily:"Raleway",
				fontSize:19
			},
			color : Alloy.Globals.buttonColor,
			height : 20,
			right : 60,
		});

		row.add(titleLbl);

		var ratingLbl = Ti.UI.createLabel({
			left : 80,
			top : 25,
			id : "ViewDetails",
			extend : true,
			parantObj : row,
			text : "View Details +",
			font:{
				fontFamily:"Raleway",
				fontSize:12
			},
			color : Alloy.Globals.buttonColor3,
			height : 20,
			width : 90,
		});

		row.add(ratingLbl);

		var ptBlncLbl = $.UI.create('Label', {
			text : "Point\nBalance",
			visible : false,
			top : 10,
			right : 10,
			font:{
				fontFamily:"Raleway",
				fontSize:10
			},
			color : "#000"
		});

		row.add(ptBlncLbl);
		var ptsNo = $.UI.create('Label', {
			text : "11",
			visible : false,
			top : 35,
			right : 18,
			font:{
				fontFamily:"Raleway",
				fontSize:15
			},
			color : Alloy.Globals.buttonColor,
		});
		row.hide1 = ptBlncLbl;
		row.hide2 = ptsNo;
		row.add(ptsNo);

		dataRows.push(row);
	}

	$.rewardsTable.setData(dataRows);

	$.rewardsTable.addEventListener("click", function(e) {

		if ("ViewDetails" == e.source.id) {
			var currentObj;
			if (e.source.extend) {
				e.source.parantObj.hide1.visible = true;
				e.source.parantObj.hide2.visible = true;
				e.source.parantObj.backgroundColor = "#FFF";
				e.source.extend = false;
				e.source.parantObj.height = 300;
				e.source.text = "View Details -";
				var currentObj = createExpandView("");
				e.source.currentObj = currentObj;
				e.source.parantObj.add(currentObj);
			} else {
				e.source.parantObj.hide1.visible = false;
				e.source.parantObj.hide2.visible = false;
				e.source.parantObj.backgroundColor = Alloy.Globals.mapsBackgroundColor;
				e.source.extend = true;
				e.source.parantObj.height = 60;
				e.source.text = "View Details +";
				e.source.parantObj.remove(e.source.currentObj);
			}
		}

	});
}

function createExpandView(data) {
	//create Extending view
	var extView = Ti.UI.createView({
		top : 60,
		left : 0,
		right : 0,
		height : 240,
		layout : "horizontal",
		backgroundColor : "#FFF"
	});

	for (var i = 0; i < 3; i++) {

		var h1 = Ti.UI.createView({
			top : 0,
			left : 0,
			height : 240,
			width : "33%",
			layout : "vertical",
		});

		var goldImg = $.UI.create('ImageView', {
			top : 10,
			height : 40,
			width : 55,
			// classes : ["loveImg"],
		});

		if (i == 0) {
			goldImg.image = "/images/prize_gold.png";
		} else if (i == 1) {
			goldImg.image = "/images/prize_silver.png";
		} else if (i == 2) {
			goldImg.image = "/images/prize_bronze.png";
		}

		h1.add(goldImg);

		var goldLbl = $.UI.create('Label', {
			text : "Gold",
			top : 5,
			left : 0,
			right:0,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font:{
				fontFamily:"Raleway",
				fontSize:16,
				fontWeight:"bold"
			},
			classes : ["H1BlkLbl"],
		});

		h1.add(goldLbl);

		var backView = $.UI.create('View', {
			top : 5,
			//left : 43,
			height : 40,
			width : 40,
			layout : "vertical",
			backgroundImage : "/images/circle.png"
		});

		h1.add(backView);

		var ptsLbl = $.UI.create('Label', {
			text : "15",
			top : 5,
			font:{
				fontFamily:"Raleway",
				fontSize:14
			},
			classes : ["H2BoldLbl"],
		});

		backView.add(ptsLbl);

		var pts = $.UI.create('Label', {
			text : "pts",
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			top : 0,
			width:20,
			font:{
				fontFamily:"Raleway",
				fontSize:10
			},
			classes : ["H2BlkLbl"],
			opacity : 0.6
		});

		backView.add(pts);

		var redeemImg = $.UI.create('ImageView', {
			top : 0,
			width : 70,
			height : 43,
		});

		if (i == 0) {
			goldLbl.text = "Gold";
		} else if (i == 1) {
			goldLbl.text = "Silver";
			h1.add(redeemImg);
			redeemImg.image = "/images/redeem.png";
		} else if (i == 2) {
			goldLbl.text = "Bronze";
			h1.add(redeemImg);
			redeemImg.image = "/images/redeem.png";
		}

		var itemLbl = $.UI.create('Label', {
			text : "1 sandwitch 1 side & 1 drink",
			top : 10,
			left : 10,
			right : 10,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			font:{
				fontFamily:"Raleway",
				fontSize:14
			},
			classes : ["H2BlkLbl"],
		});

		h1.add(itemLbl);
		extView.add(h1);

	}

	return extView;
}

function openLoyalty() {
	if (!isClicked) {
		isClicked = true;
		
		$.rewardsTable.hide();
		$.loyaltyTable.show();
		
		// createLoyaltyList();
		// $.loyaltyRewardsView.remove($.rewardsTable);
		// $.loyaltyRewardsView.add($.loyaltyTable);
		
		$.rewatdsH.color = "gray";
		$.loyaltyH.color = Alloy.Globals.navBarColor;
		$.baseLineLoyal.backgroundColor = Alloy.Globals.navBarColor;
		$.baseLineLoyal.show();
		$.baseLineReward.hide();
	}
}

function openRewards() {
	if (isClicked) {
		isClicked = false;
		
		$.rewardsTable.show();
		$.loyaltyTable.hide();

		// createRewardsList();
		// $.loyaltyRewardsView.remove($.loyaltyTable);
		// $.loyaltyRewardsView.add($.rewardsTable);
		
		$.loyaltyH.color = "gray";
		$.rewatdsH.color = Alloy.Globals.navBarColor;
		$.baseLineReward.backgroundColor = Alloy.Globals.navBarColor;
		$.baseLineReward.show();
		$.baseLineLoyal.hide();
	}
}

//$.loyaltyRewardsView.remove($.rewardsTable);

//
createLoyaltyList();
createRewardsList();
openLoyalty();

