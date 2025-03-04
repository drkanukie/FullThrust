

function ButtonWidget(inWidgetName, inTitleString, inOnClick) {

	var outText = new String("<INPUT TYPE='BUTTON'");
	outText += " NAME='" + inWidgetName + "'";

	if (inTitleString != null) {
		outText += " VALUE='" + inTitleString + "'";
	}

	if (inOnClick != null) {
		outText += " onClick='" + inOnClick + "'";
	}

	outText += ">";
	return (outText);
}

function CheckboxWidget(inWidgetName, inDefaultValue, inOnClick) {

	var outText = new String("<INPUT TYPE='CHECKBOX'");
	outText += " NAME='" + inWidgetName + "'";
	if (inDefaultValue != null) {
		if (inDefaultValue) {
			outText += " CHECKED";
		}
	}

	if (inOnClick != null) {
		outText += " onClick='" + inOnClick + "'";
	}

	outText += ">";
	return (outText);
}

function FmtTableCell(inContent) {

	var outText = "<td>";
	var tableOpenFont = (gTableFontTag == null) ? "" : gTableFontTag;
	var tableCloseFont = (tableOpenFont == "") ? "" : "</font>";
	outText += tableOpenFont + inContent + tableCloseFont;
	outText += "</td>";
	return (outText);
}

function NestedTable(inTableContent) {

	var outText = new String("<table border=0 cellpadding=2 cellspacing=0>\r");
	outText += inTableContent;
	outText += "</table>\r";
	return (outText);
}

function SelectStringWidget(inSelectName, inArray, inSelectedItem, inOnChange) {

	//	Generate HTML text for a select widget from an array of strings.
	var numOptions = inArray.length;
	var outText = new String("<SELECT NAME='" + inSelectName + "'");
	if (inOnChange != null) {
		outText += " onChange='" + inOnChange + "'";
	}

	outText += ">\r";

	var idx;

	if (inSelectedItem == null) {
		inSelectedItem = 0;
	}

	for (idx = 0; idx < numOptions; idx++) {
		outText += "<OPTION VALUE=" + idx;
		if (idx == inSelectedItem) {
			outText += " SELECTED";
		}
		outText += ">";
		outText += inArray[idx] + "\r";
	}

	outText += "</SELECT>\r";
	return (outText);
}

function SelectWidget(inSelectName, inArray, inSelectedItem, inOnChange) {

	var numOptions = inArray.length;

	var outText = new String("<SELECT NAME='" + inSelectName + "'");

	if (inOnChange != null) {

		outText += " onChange='" + inOnChange + "'";

	}

	outText += ">\r";

	var idx;

	if (inSelectedItem == null) {

		inSelectedItem = 0;

	}

	for (idx = 0; idx < numOptions; idx++) {

		outText += "<OPTION VALUE=" + idx;

		if (idx == inSelectedItem) {

			outText += " SELECTED";

		}

		outText += ">";

		if (inArray[idx].desc != null) {

			outText += inArray[idx].desc + "\r";

		} else {

			outText += inArray[idx] + "\r";

		}

	}

	outText += "</SELECT>\r";

	return (outText);

}

function TableRow() {

	var outText = "";

	var tableOpenFont = (gTableFontTag == null) ? "" : gTableFontTag;

	var tableCloseFont = (tableOpenFont == "") ? "" : "</font>";

	if (arguments.length > 0) {

		outText += "<tr valign=top>";

		if (arguments[0].substring(0, 4) == "ALN:") {

			var scratch = arguments[0].substring(4, arguments[0].length);

			var aligns = scratch.split(",");

			var align;

			for (var idx = 1; idx < arguments.length; idx++) {

				align = aligns[idx - 1];

				if (align != "") {

					outText += "<td align='" + align + "'>";

				} else {

					outText += "<td>";

				}

				outText += tableOpenFont + arguments[idx] + tableCloseFont + "</td>";

			}

		} else {

			for (var idx = 0; idx < arguments.length; idx++) {

				outText += "<td>" + tableOpenFont + arguments[idx] + tableCloseFont + "</td>";

			}

		}

		outText += "</tr>";

	}

	return (outText);

}

function TextWidget(inWidgetName, inWidth, inDefaultText, inOnChange, inDisabled) {

	var outText = new String("<INPUT TYPE='TEXT'");

	outText += " NAME='" + inWidgetName + "'";

	if (inWidth != null) {

		outText += " SIZE=" + inWidth;

	}

	if (inDefaultText != null) {

		outText += " VALUE='" + inDefaultText + "'";

	}

	if (inOnChange != null) {

		outText += " onChange='" + inOnChange + "'";

	}

	if (inDisabled != null) {

		if (inDisabled) {

			outText = outText + " enabled=0";

		}

	}

	outText += ">";

	return (outText);

}

function TitledTableRow(inLabel, inContent, inLabelCol) {

	var outText = new String("<tr valign=top>");

	var tableOpenFont = (gTableFontTag == null) ? "" : gTableFontTag;

	var tableCloseFont = (tableOpenFont == "") ? "" : "</font>";

	if (inLabelCol == 2) {

		outText += "<td>" + tableOpenFont + inContent + tableCloseFont + "</td>";

		outText += "<td>" + tableOpenFont + "<b>" + inLabel + "</b>" + tableCloseFont + "</td>";

	} else {

		outText += "<td>" + tableOpenFont + "<b>" + inLabel + "</b>" + tableCloseFont + "</td>";

		outText += "<td>" + tableOpenFont + inContent + tableCloseFont + "</td>";

	}

	outText += "</tr>";

	return (outText);

}





function IdGenerator() {



	//	Attributes

	this.gens = new Array();



	//	Methods

	this.NewId = IDGEN_NewId;

}



function IDGEN_NewId(inFieldKey) {

	if (inFieldKey == null) {

		inFieldKey = "UNIVERSAL";

	}

	if (this.gens[inFieldKey] == null) {

		this.gens[inFieldKey] = 0;

	}

	var temp = this.gens[inFieldKey] + 1;

	this.gens[inFieldKey] = temp;

	return (temp);

}



//	=======	MODULE:	fleetbook	========


//	=======	MODULE:	classes	========

function ArcInfo(arcA, arcAP, arcAS, arcF, arcFP, arcFS) {

	//	Attributes

	//	Non-Params
	this.objectId = 0;

	//	Params
	this.arcA = (arcA == null) ? false : arcA;
	this.arcAP = (arcAP == null) ? false : arcAP;
	this.arcAS = (arcAS == null) ? false : arcAS;
	this.arcF = (arcF == null) ? true : arcF;
	this.arcFP = (arcFP == null) ? false : arcFP;
	this.arcFS = (arcFS == null) ? false : arcFS;

	//	Methods
	this.GetFormWidgets = ARC_GetFormWidgets;
	this.NumArcs = ARC_NumArcs;
	this.ProcessChange = ARC_ProcessChange;
	this.Report = ARC_Report;
	this.UpdateWidgets = ARC_UpdateWidgets;
	this.ObjectId = NULS_ObjectId;
}



function ARC_GetFormWidgets() {

	var outText = "";
	outText += TableRow(CheckboxWidget("Arc_FP_" + this.ObjectId(), this.arcFP, "parent.Recalc(this);") + "<b>FP</b>", CheckboxWidget("Arc_F_" + this.ObjectId(), this.arcF, "parent.Recalc(this);") + "<b>F</b>", CheckboxWidget("Arc_FS_" + this.ObjectId(), this.arcFS, "parent.Recalc(this);") + "<b>FS</b>");
	outText += TableRow(CheckboxWidget("Arc_AP_" + this.ObjectId(), this.arcAP, "parent.Recalc(this);") + "<b>AP</b>", CheckboxWidget("Arc_A_" + this.ObjectId(), this.arcA, "parent.Recalc(this);") + "<b>A</b>", CheckboxWidget("Arc_AS_" + this.ObjectId(), this.arcAS, "parent.Recalc(this);") + "<b>AS</b>");
	return (outText);

}

function ARC_NumArcs() {

	var numArcs = 0;

	numArcs += (this.arcFP) ? 1 : 0;
	numArcs += (this.arcF) ? 1 : 0;
	numArcs += (this.arcFS) ? 1 : 0;
	numArcs += (this.arcAP) ? 1 : 0;
	numArcs += (this.arcA) ? 1 : 0;
	numArcs += (this.arcAS) ? 1 : 0;
	return (numArcs);

}

function ARC_ProcessChange(inWidget) {

	//	Process a widget change-of-value
	var widgetName = inWidget.name;
	var nameBits = widgetName.split("_");
	var widgetHandled = false;

	if ((nameBits[0] == "Arc") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "F") {
			this.arcF = inWidget.checked;
			widgetHandled = true;
		}

		if (nameBits[1] == "FP") {
			this.arcFP = inWidget.checked;
			widgetHandled = true;
		}

		if (nameBits[1] == "FS") {
			this.arcFS = inWidget.checked;
			widgetHandled = true;
		}

		if (nameBits[1] == "A") {
			this.arcA = inWidget.checked;
			widgetHandled = true;
		}

		if (nameBits[1] == "AP") {
			this.arcAP = inWidget.checked;
			widgetHandled = true;
		}

		if (nameBits[1] == "AS") {
			this.arcAS = inWidget.checked;
			widgetHandled = true;
		}

		if (this.NumArcs() == 0) {
			this.arcF = true;
		}
	}

	if (widgetHandled) {
		this.UpdateWidgets(inWidget.form);
	}
	return (widgetHandled);
}

function ARC_Report() {
	var outText = "";

	outText += (this.arcFP) ? "FP " : "";
	outText += (this.arcF) ? "F " : "";
	outText += (this.arcFS) ? "FS " : "";
	outText += (this.arcAP) ? "AP " : "";
	outText += (this.arcA) ? "A " : "";
	outText += (this.arcAS) ? "AS " : "";
	return (outText);
}

function ARC_UpdateWidgets(inForm) {

	var outText = "";
	var names = new Array("FP", "F", "FS", "AP", "A", "AS");
	var cmd = "";
	var idx;

	for (idx = 0; idx < names.length; idx++) {
		cmd = "inForm.Arc_" + names[idx] + "_" + this.ObjectId() + ".checked = this.arc" + names[idx];
		//	notify( "About to evaluate: " + cmd )
		eval(cmd);
	}
}//	notify( "Evaluated: " + cmd )


function HullInfo(desc, massFraction, type) {

	//	Attributes
	this.desc = (desc == null) ? "Average" : desc;
	this.massFraction = (massFraction == null) ? 0.3 : massFraction;
	this.type = (type == null) ? 2 : type;

	//	Methods
	this.Cost = HULL_Cost;
	this.DamageBoxes = HULL_DamageBoxes;
	this.Mass = HULL_Mass;
}



function HULL_Cost(inShipDisplacement) {
	return (2 * this.Mass(inShipDisplacement));
}

function HULL_DamageBoxes(inShipDisplacement) {
	return (this.Mass(inShipDisplacement));
}

function HULL_Mass(inShipDisplacement) {
	return (Math.round(this.massFraction * inShipDisplacement));
}


function ShipDesign() {

	//	Attributes

	//	calculated
	this.cost = 0;
	this.massUsed = 0;
	this.prevSelectedSystem = 0;
	this.systems = new Array();

	//	specified
	this.activeSensors = 0;
	this.armor = 0;
	this.desc = "";
	this.ECM = 0;
	this.ftlCapable = true;
	this.ftlTowCap = 0;
	this.hull = new HullInfo();
	this.mass = 85;
	this.shipType = new ShipTypeInfo();
	this.streamlining = new StreamliningInfo();
	this.thrust = 4;

	//	Methods

	this.ArmorCost = SHIP_ArmorCost;
	this.ArmorMass = SHIP_ArmorMass;
	this.DriveCost = SHIP_DriveCost;
	this.DriveMass = SHIP_DriveMass;
	this.EcmCost = SHIP_EcmCost;
	this.EcmMass = SHIP_EcmMass;
	this.FTLCost = SHIP_FTLCost;
	this.FTLMass = SHIP_FTLMass;
	this.Recalc = SHIP_Recalc;
	this.Recalculate = SHIP_Recalculate;
	this.RecalculateCost = SHIP_RecalculateCost;
	this.RecalculateMass = SHIP_RecalculateMass;
	this.SensorCost = SHIP_SensorCost;
	this.SensorMass = SHIP_SensorMass;
	this.AddSystem = SHIP_AddSystem;
	this.ArmorTrack = SHIP_ArmorTrack;
	this.DamageTrack = SHIP_DamageTrack;
	this.DeleteSystem = SHIP_DeleteSystem;
	this.GetForm = SHIP_GetForm;
	this.GetFormWidgets = SHIP_GetFormWidgets;
	this.ProcessChange = SHIP_ProcessChange;
	this.Report = SHIP_Report;
	this.TrackString = SHIP_TrackString;
}



function SHIP_ArmorCost() {

	return (2 * this.ArmorMass());

}

function SHIP_ArmorMass() {

	return (this.armor);

}

function SHIP_DriveCost() {

	return (2 * this.DriveMass());

}

function SHIP_DriveMass() {

	return (Math.max(Math.round(this.thrust * 0.05 * this.mass), 1));

}

function SHIP_EcmCost() {

	return (10 * this.EcmMass());

}

function SHIP_EcmMass() {

	return (((this.shipType.type == 0) && (this.ECM > 0)) ? (this.ECM + 1) : 0);

}

function SHIP_FTLCost() {

	return (2 * this.FTLMass());

}

function SHIP_FTLMass() {

	return (this.ftlCapable ? Math.max(Math.round(this.mass * 0.1 + this.ftlTowCap * 0.2), 1) : 0);

}

function SHIP_Recalc(widget) {

	this.ProcessChange(widget);

	this.Recalculate();

}

function SHIP_Recalculate() {

	//	Recalculate point cost and mass used from scratch.

	this.RecalculateCost();

	this.RecalculateMass();

}

function SHIP_RecalculateCost() {

	//	Recalculate point cost from scratch.



	//	Basic hull

	this.cost = this.mass;

	this.cost += this.hull.Cost(this.mass);

	//	Crew by ship type -- no cost

	//	Streamlining

	this.cost += this.streamlining.Cost(this.mass);

	//	Armor

	this.cost += this.ArmorCost();

	//	N-space drive

	this.cost += this.DriveCost();

	//	FTL drive

	this.cost += this.FTLCost();

	//	Sensors and ECM

	this.cost += this.SensorCost();

	this.cost += this.EcmCost();



	//	Systems

	if (this.systems.length > 0) {

		for (var idx = 0; idx < this.systems.length; idx++) {

			if (this.systems[idx] != null) {

				this.cost += this.systems[idx].Cost(this.mass);

			}

		}

	}

}

function SHIP_RecalculateMass() {

	//	Recalculate mass used from scratch.



	//	Basic hull

	this.massUsed = this.hull.Mass(this.mass);

	//	Streamlining

	this.massUsed += this.streamlining.Mass(this.mass);

	//	Crew by ship type -- no mass

	//	Armor

	this.massUsed += this.ArmorMass();

	//	N-space drive

	this.massUsed += this.DriveMass();

	//	FTL drive

	this.massUsed += this.FTLMass();

	//	Sensors and ECM

	this.massUsed += this.SensorMass();

	this.massUsed += this.EcmMass();



	//	Systems

	if (this.systems.length > 0) {

		for (var idx = 0; idx < this.systems.length; idx++) {

			if (this.systems[idx] != null) {

				this.massUsed += this.systems[idx].Mass(this.mass);

			}

		}

	}

}

function SHIP_SensorCost() {

	return (15 * this.SensorMass());

}

function SHIP_SensorMass() {

	return ((this.shipType.type == 0) ? this.activeSensors : 0);

}

function SHIP_AddSystem(inSystemClassName) {

	var newSysCmd = "new " + inSystemClassName + "();";

	var newSystem = eval(newSysCmd);

	this.systems[this.systems.length] = newSystem;

}

function SHIP_ArmorTrack() {

	var damageWidth = Math.ceil(this.hull.DamageBoxes(this.mass) / 4.0);

	var armorBox = '<img src="../img/armorbox.gif" border="0" height="10" width="10">';

	var numBoxes = this.armor;

	var numInRow;

	var trackStr = "";

	while (numBoxes > 0) {

		numInRow = damageWidth;

		while ((numInRow > 0) && (numBoxes > 0)) {

			trackStr += armorBox;

			numInRow--;

			numBoxes--;

		}

		trackStr += "<br>\r";

	}

	return (trackStr);

}

function SHIP_DamageTrack() {

	var numBoxes = this.hull.DamageBoxes(this.mass);

	var damageBox = '<img src="../img/damagebox.gif" border="0" height="10" width="10">';

	var crewBox = '<img src="../img/crewbox.gif" border="0" height="10" width="10">';

	return (this.TrackString(numBoxes, 4, damageBox, this.shipType.Crew(this.mass), crewBox));

}

function SHIP_DeleteSystem(inSystemId) {

	//	Locate & remove the target system

	var idx = 0;

	while (idx < this.systems.length) {

		if (this.systems[idx] != null) {

			if (this.systems[idx].ObjectId() == inSystemId) {

				this.systems[idx] = null;

				break;

			} else {

				idx++;

			}

		} else {

			idx++;

		}

	}

}

function SHIP_GetForm() {

	var outText = "";

	outText += "<html><head><title>Armageddon Outfitter Worksheet</title></head>\r";

	outText += "<body bgcolor='#FFFFFF' text='#000000'>\r";

	outText += "<form method=POST name='ShipDesignForm' action='#'>\r";

	outText += this.GetFormWidgets();

	outText += "</form>\r";

	outText += "</body></html>\r";

	return (outText);

}

function SHIP_GetFormWidgets() {

	var colAlign = "ALN:,,right,right";

	var temp = "";

	var outText = "<table width=100% border=0 cellpadding=2 cellspacing=0>\r";

	//	Table header

	outText += "<tr valign=bottom>" + "<td colspan=2><font face='sans-serif' size=+2><b>Ship Design Parameters</b></font></td>" + "<td align=right>" + gTableFontTag + "<font size=-1><b>Mass</b></font>" + "</font></td>" + "<td align=right>" + gTableFontTag + "<font size=-1><b>Points</b></font>" + "</font></td>" + "</tr>\r";

	outText += "<tr><td colspan=4><hr size=2 noshade></td></tr>\r";

	//	Table content

	outText += TitledTableRow("Description", TextWidget("Ship_Desc", 25, this.desc, "parent.Recalc(this);")) + "\r";

	outText += TableRow(colAlign, "<b>Ship Type</b>", SelectWidget("Ship_ShipType", TableShipType, this.shipType.type, "parent.Recalc(this);"), "", "") + "\r";

	outText += TableRow(colAlign, "<b>Hull Displacement</b>", TextWidget("Ship_Mass", 5, this.mass, "parent.Recalc(this);"), "<hr width=12 size=1 noshade>", this.mass) + "\r";

	outText += TableRow(colAlign, "<b>Hull Strength</b>", SelectWidget("Ship_HullStrength", TableHull, this.hull.type, "parent.Recalc(this);"), this.hull.Mass(this.mass), this.hull.Cost(this.mass)) + "\r";

	outText += TableRow(colAlign, "<b>Hull Armor</b>", TextWidget("Ship_Armor", 5, this.armor, "parent.Recalc(this);"), this.ArmorMass(), this.ArmorCost()) + "\r";

	outText += TableRow(colAlign, "<b>Streamlining</b>", SelectWidget("Ship_Streamlining", TableStreamlining, this.streamlining.type, "parent.Recalc(this);"), this.streamlining.Mass(this.mass), this.streamlining.Cost(this.mass)) + "\r";

	outText += TableRow(colAlign, "<b>Main Drive Thrust</b>", TextWidget("Ship_Thrust", 5, this.thrust, "parent.Recalc(this);"), this.DriveMass(), this.DriveCost()) + "\r";

	temp = CheckboxWidget("Ship_FtlCapable", this.ftlCapable, "parent.Recalc(this);");

	if (this.ftlCapable) {

		temp += " &nbsp; Tow Capacity " + TextWidget("Ship_FtlTowCap", 5, this.ftlTowCap, "parent.Recalc(this);");

	}

	outText += TableRow(colAlign, "<b>FTL Capable</b>", temp, this.FTLMass(), this.FTLCost()) + "\r";

	if (this.shipType.type == 0) {

		outText += TableRow(colAlign, "<b>Active Sensors</b>", SelectWidget("Ship_ActiveSensors", TableActiveSensors, this.activeSensors, "parent.Recalc(this);"), this.SensorMass(), this.SensorCost()) + "\r";

		outText += TableRow(colAlign, "<b>ECM</b>", SelectWidget("Ship_ECM", TableECM, this.ECM, "parent.Recalc(this);"), this.EcmMass(), this.EcmCost()) + "\r";

	}



	outText += "</table>\r";



	//	Sub-info -- systems

	if (this.systems.length > 0) {

		outText += "<table width=100% border=0 cellpadding=2 cellspacing=0>\r";

		outText += TableRow("", "", "");

		for (var idx = 0; idx < this.systems.length; idx++) {

			if (this.systems[idx] != null) {

				outText += "<tr><td colspan=3><hr size=1 noshade></td></tr>\r";

				outText += this.systems[idx].GetFormWidgets(this.mass);

			}

		}

		outText += "</table>\r";

	}



	//	Add-system controls

	outText += "<hr size=2 noshade>\r";

	outText += "<table width=100% border=0 cellpadding=2 cellspacing=0>\r";

	outText += TableRow("<b>New System</b>", SelectWidget("System_AddType", TableAddSystem, this.prevSelectedSystem), ButtonWidget(" System_Add", "Add", "parent.Recalc(this.form.System_AddType);"));

	outText += "</table>\r";



	return (outText);

}

function SHIP_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	var selectIdx;

	var selectValue;

	var widgetValue;



	if (nameBits[0] == "Ship") {

		if (nameBits[1] == "ActiveSensors") {

			selectIdx = inWidget.selectedIndex;

			selectValue = eval(inWidget.options[selectIdx].value);

			this.activeSensors = selectValue;

			widgetHandled = true;

		}

		if (nameBits[1] == "Armor") {

			widgetValue = eval(inWidget.value);

			if (this.armor != widgetValue) {

				this.armor = widgetValue;

			}

			widgetHandled = true;

		}

		if (nameBits[1] == "Desc") {

			widgetValue = inWidget.value;

			if (this.desc != widgetValue) {

				this.desc = widgetValue;

			}

			widgetHandled = true;

		}

		if (nameBits[1] == "ECM") {

			selectIdx = inWidget.selectedIndex;

			selectValue = eval(inWidget.options[selectIdx].value);

			this.ECM = selectValue;

			widgetHandled = true;

		}

		if (nameBits[1] == "FtlCapable") {

			widgetValue = inWidget.checked;

			this.ftlCapable = widgetValue;

			widgetHandled = true;

		}

		if (nameBits[1] == "FtlTowCap") {

			widgetValue = eval(inWidget.value);

			this.ftlTowCap = widgetValue;

			widgetHandled = true;

		}

		if (nameBits[1] == "HullStrength") {

			selectIdx = inWidget.selectedIndex;

			selectValue = eval(inWidget.options[selectIdx].value);

			if (this.hull.type != selectValue) {

				this.hull = TableHull[selectValue];

			}

			widgetHandled = true;

		}

		if (nameBits[1] == "Mass") {

			widgetValue = eval(inWidget.value);

			if (this.mass != widgetValue) {

				this.mass = widgetValue;

			}

			widgetHandled = true;

		}

		if (nameBits[1] == "ShipType") {

			selectIdx = inWidget.selectedIndex;

			selectValue = eval(inWidget.options[selectIdx].value);

			this.shipType = TableShipType[selectValue];

			if (this.shipType.type != 0) {

				this.activeSensors = 0;

				this.ECM = 0;

			}

			widgetHandled = true;

			gMustUpdateDisplay = true;

		}

		if (nameBits[1] == "Streamlining") {

			selectIdx = inWidget.selectedIndex;

			selectValue = eval(inWidget.options[selectIdx].value);

			if (this.streamlining.type != selectValue) {

				this.streamlining = TableStreamlining[selectValue];

			}

			widgetHandled = true;

		}

		if (nameBits[1] == "Thrust") {

			widgetValue = eval(inWidget.value);

			if (this.thrust != widgetValue) {

				this.thrust = widgetValue;

			}

			widgetHandled = true;

		}

	}



	if (nameBits[0] == "System") {

		if (nameBits[1] == "AddType") {

			selectIdx = inWidget.selectedIndex;

			selectValue = eval(inWidget.options[selectIdx].value);

			this.prevSelectedSystem = selectValue;

			this.AddSystem(TableAddSystem[selectValue].systemClass);

			widgetHandled = true;

		}

		if (nameBits[1] == "Delete") {

			this.DeleteSystem(nameBits[2]);

			widgetHandled = true;

		}

		if (widgetHandled) {

			gMustUpdateDisplay = true;

		}

	}



	if (!widgetHandled) {

		//	See if one of the systems will handle it

		var idx = 0;

		while ((idx < this.systems.length) && (!widgetHandled)) {

			if (this.systems[idx] != null) {

				widgetHandled = this.systems[idx].ProcessChange(inWidget);

			}

			idx++;

		}

	}



	//	if ( widgetHandled ) alert( "BEAM_ProcessChange: Widget " + widgetName + " handled" )

	if (!widgetHandled) {

		alert("Unknown widget \"" + inWidget.name + "\"");

	}

	return (widgetHandled);

}

function SHIP_Report() {

	var scratch;

	var outText = "";

	outText += "<html><head><title>Armageddon Outfitter Worksheet</title></head>\r";

	outText += "<body bgcolor='#FFFFFF' text='#000000'>\r";

	outText += new String("<table border=0 cellpadding=2 cellspacing=0>\r");

	if ((this.desc == "") || (this.desc == null)) {

		outText += "<tr valign=top><td colspan=2><h2><font face='sans-serif'>Design Summary</font></h2></td></tr>\r";

	} else {

		outText += "<tr valign=top><td colspan=2><h2><font face='sans-serif'>" + this.desc + "</font></h2></td></tr>\r";

	}

	outText += TitledTableRow("Hull Displacement", this.mass) + "\r";

	outText += TitledTableRow("Point Cost", this.cost) + "\r";

	scratch = this.mass - this.massUsed;

	if (scratch >= 0) {

		outText += TitledTableRow("Unallocated Mass", scratch) + "\r";

	} else {

		outText += TableRow("<font color='#990000'><b>Unallocated Mass</b></font>", "<font color='#990000'><b>" + scratch + "</b></font>") + "\r";

	}

	outText += TitledTableRow("Ship Type", this.shipType.desc) + "\r";

	outText += TitledTableRow("Hull Strength", this.hull.desc) + "\r";

	outText += TitledTableRow("Hull Armor", this.armor) + "\r";

	outText += TitledTableRow("Streamlining", this.streamlining.desc) + "\r";

	outText += TitledTableRow("Thrust", this.thrust) + "\r";

	if (this.ftlCapable == true) {

		if (this.ftlTowCap > 0) {

			outText += TitledTableRow("FTL Capable", "Tow cap: " + this.ftlTowCap) + "\r";

		} else {

			outText += TitledTableRow("FTL Capable", "") + "\r";

		}

	}

	if (this.shipType.type == 0) {

		outText += TitledTableRow("Passive Sensors", "") + "\r";

		outText += TitledTableRow("Active Sensors", TableActiveSensors[this.activeSensors]) + "\r";

	}

	outText += TitledTableRow("ECM", TableECM[this.ECM]) + "\r";



	//	Armor and Damage Tracks

	outText += "<tr valign=top><td colspan=2>" + this.ArmorTrack() + "</td></tr>\r";

	outText += "<tr valign=top><td colspan=2>" + this.DamageTrack() + "</td></tr>\r";



	//	Systems

	outText += "<tr valign=top><td colspan=2><hr size=1 noshade></td></tr>\r";

	for (var idx = 0; idx < this.systems.length; idx++) {

		if (this.systems[idx] != null) {

			outText += this.systems[idx].Report();

		}

	}



	outText += "</table>\r";

	outText += "</body></html>";

	return (outText);

}

function SHIP_TrackString(numBoxes, numRows, boxSymbol, crewCount, crewSymbol) {

	//	Set default values

	if (boxSymbol == null) {

		boxSymbol = "O";

	}

	if (crewCount == null) {

		//	Don't show crew symbols

		crewCount = numBoxes + 1;

	}

	if (crewSymbol == null) {

		crewSymbol = "*";

	}



	var tracks = new Array();

	var trackStr = "";

	var idx = 0;



	//	Create tracks entries

	for (idx = 0; idx < numRows; idx++) {

		tracks[idx] = 0;

	}

	//	Determine # boxes per row

	idx = 0;

	var trackIdx = 0;

	while (idx < numBoxes) {

		tracks[trackIdx] += 1;

		trackIdx = (idx + 1) % numRows;

		idx++;

	}

	//	Convert boxes-per-row to row-end indices

	var temp = tracks[0];

	for (idx = 1; idx < numRows; idx++) {

		temp += tracks[idx];

		tracks[idx] = temp;

	}



	//	Construct full boxes string

	var boxStr = "";

	var crewInterval = Math.ceil(numBoxes / crewCount);

	var crewAdded = 0;



	//	All but last symbol

	trackIdx = 0;

	for (idx = 0; idx < (numBoxes - 1); idx++) {

		if ((idx + 1) % crewInterval == 0) {

			boxStr += crewSymbol;

			crewAdded++;

		} else {

			boxStr += boxSymbol;

		}

		if ((idx + 1) == tracks[trackIdx]) {

			boxStr += "<br>\r";

			trackIdx++;

		}

	}

	//	Last symbol

	if (crewAdded < crewCount) {

		boxStr += crewSymbol;

	} else {

		boxStr += boxSymbol;

	}



	//	Assemble trackStr

	trackStr += boxStr;



	return ("<tt>" + trackStr + "</tt>");

}





function ShipTypeInfo(crewRatio, desc, type) {



	//	Attributes

	this.crewRatio = (crewRatio == null) ? 0.05 : crewRatio;

	this.desc = (desc == null) ? "Military" : desc;

	this.type = (type == null) ? 0 : type;



	//	Methods

	this.Cost = NULS_Cost;

	this.Crew = SHTY_Crew;

	this.DCPs = SHTY_DCPs;

	this.Mass = SHTY_Mass;

}



function SHTY_Crew(inShipDisplacement) {

	return (Math.ceil(this.crewRatio * inShipDisplacement));

}

function SHTY_DCPs(inShipDisplacement) {

	return (this.Crew(inShipDisplacement));

}

function SHTY_Mass() {

	return (0);

}





function StreamliningInfo(desc, massFactor, type) {



	//	Attributes

	this.desc = (desc == null) ? "None" : desc;

	this.massFactor = (massFactor == null) ? 0.0 : massFactor;

	this.type = (type == null) ? 0 : type;



	//	Methods

	this.Cost = STRM_Cost;

	this.Mass = STRM_Mass;

}



function STRM_Cost(inShipDisplacement) {

	return (2.0 * this.Mass(inShipDisplacement));

}

function STRM_Mass(inShipDisplacement) {

	return (this.type > 0 ? Math.max(Math.round(inShipDisplacement * this.massFactor), 1) : 0);

}





function SystemDescriptor(desc, systemClass) {



	//	Attributes

	this.desc = (desc == null) ? "Beam Battery" : desc;

	this.systemClass = (systemClass == null) ? "BeamSystem" : systemClass;



	//	Methods

}







//	=======	MODULE:	Systems	========







function ADFCSystem() {



	//	Attributes

	this.adfcCount = 1;

	this.objectId = 0;



	//	Methods

	this.GetFormWidgets = ADFC_GetFormWidgets;

	this.Mass = ADFC_Mass;

	this.ProcessChange = ADFC_ProcessChange;

	this.Report = ADFC_Report;

	this.UpdateWidgets = ADFC_UpdateWidgets;

	this.Cost = NULS_Cost4X;

	this.ObjectId = NULS_ObjectId;

}



function ADFC_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>ADFC</b>", " <b>Qty</b>" + TextWidget("ADFC_Count_" + this.ObjectId(), 2, this.adfcCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function ADFC_Mass() {

	return (2 * this.adfcCount);

}

function ADFC_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "ADFC") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Count") {

			this.adfcCount = eval(inWidget.value);

			if (this.adfcCount < 1) {

				this.adfcCount = 1;

				this.UpdateWidgets(inWidget.form);

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function ADFC_Report() {

	var outText = TableRow("<b>ADFC</b>", "(" + this.adfcCount + ")");

	return (outText);

}

function ADFC_UpdateWidgets(inForm) {

	if (inForm == null) {

		alert("inForm is null");

		return;

	}

	var cmd = "inForm.ADFC_Count_" + this.ObjectId() + ".value = this.adfcCount;";

	eval(cmd);

}





function BeamSystem() {



	//	Attributes

	this.arcs = new ArcInfo(true, true, true, true, true, true);

	this.beamClass = 1;

	this.objectId = 0;



	//	Methods

	this.GetFormWidgets = BEAM_GetFormWidgets;

	this.Mass = BEAM_Mass;

	this.MungeArcs = BEAM_MungeArcs;

	this.ProcessChange = BEAM_ProcessChange;

	this.Report = BEAM_Report;

	this.UpdateWidgets = BEAM_UpdateWidgets;

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

}



function BEAM_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var contentText = TableRow("<b>Class</b><br>", TextWidget("Beam_Class_" + this.ObjectId(), 2, this.beamClass, "parent.Recalc(this);"), NestedTable(this.arcs.GetFormWidgets()));

	var outText = TableRow(colAlign, "<b>Beam Battery</b>", NestedTable(contentText), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function BEAM_Mass() {

	var mass = 1;

	var tempClass = this.beamClass;

	while (tempClass > 1) {

		mass *= 2;

		tempClass--;

	}

	if (this.beamClass == 2) {

		mass += Math.ceil(this.arcs.NumArcs() / 3) - 1;

	}

	if (this.beamClass > 2) {

		tempClass = this.beamClass - 2;

		var massPerExtraArc = 1;

		while (tempClass > 1) {

			massPerExtraArc *= 2;

			tempClass--;

		}

		mass += (this.arcs.NumArcs() - 1) * massPerExtraArc;

	}

	return (mass);

}

function BEAM_MungeArcs(whichArc) {

	//	Munge the arcs

	if (whichArc == null) {

		whichArc = "F";

	}

	if (this.beamClass == 1) {

		if (this.arcs.NumArcs() != 6) {

			this.arcs.arcF = true;

			this.arcs.arcFP = true;

			this.arcs.arcFS = true;

			this.arcs.arcA = true;

			this.arcs.arcAP = true;

			this.arcs.arcAS = true;

		}

	}

	if (this.beamClass == 2) {

		if ((whichArc == "F") || (whichArc == "A")) {

			this.arcs.arcFP = this.arcs.arcF;

			this.arcs.arcFS = this.arcs.arcF;

			this.arcs.arcAS = this.arcs.arcA;

			this.arcs.arcAP = this.arcs.arcA;

		}

		if ((whichArc == "FP") || (whichArc == "AS")) {

			this.arcs.arcAP = this.arcs.arcFP;

			this.arcs.arcF = this.arcs.arcFP;

			this.arcs.arcFS = this.arcs.arcAS;

			this.arcs.arcA = this.arcs.arcAS;

		}

		if ((whichArc == "FS") || (whichArc == "AP")) {

			this.arcs.arcF = this.arcs.arcFS;

			this.arcs.arcAS = this.arcs.arcFS;

			this.arcs.arcA = this.arcs.arcAP;

			this.arcs.arcFP = this.arcs.arcAP;

		}

	}

}

function BEAM_ProcessChange(inWidget) {

	//	Process a widget change-of-value





	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "Beam") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget

		if (nameBits[1] == "Class") {

			this.beamClass = eval(inWidget.value);

			if (this.beamClass < 1) {

				this.beamClass = 1;

			}

			this.MungeArcs();

			this.UpdateWidgets(inWidget.form);

			widgetHandled = true;

		}

	}



	if (!widgetHandled) {

		widgetHandled = this.arcs.ProcessChange(inWidget);

		if (widgetHandled) {

			this.MungeArcs(nameBits[1]);

			this.UpdateWidgets(inWidget.form);

		}

	}

	return (widgetHandled);

}

function BEAM_Report() {

	var outText = TableRow("<b>Beam / " + this.beamClass + "</b>", this.arcs.Report());

	return (outText);

}

function BEAM_UpdateWidgets(inForm) {

	var cmd = "inForm.Beam_Class_" + this.ObjectId() + ".value = this.beamClass";

	if (inForm == null) {

		alert("inForm is null");

		return;

	}

	eval(cmd);

	this.arcs.UpdateWidgets(inForm);

}





function CargoSystem() {



	//	Attributes

	this.capacity = 8;

	this.cargoType = 0;

	this.objectId = 0;



	//	Methods

	this.GetFormWidgets = CAR_GetFormWidgets;

	this.Mass = CAR_Mass;

	this.ProcessChange = CAR_ProcessChange;

	this.Report = CAR_Report;

	this.Cost = NULS_CostZero;

	this.ObjectId = NULS_ObjectId;

}



function CAR_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Cargo Space</b>", "<b>Capacity</b>&nbsp;" + TextWidget("CAR_Displ_" + this.ObjectId(), 2, this.capacity, "parent.Recalc(this);") + "&nbsp;" + SelectWidget("CAR_Config_" + this.ObjectId(), TableCargoType, this.cargoType, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function CAR_Mass() {

	return (this.capacity);

}

function CAR_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "CAR") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget

		if (nameBits[1] == "Displ") {

			this.capacity = eval(inWidget.value);

			if (this.capacity < 1) {

				this.capacity = 1;

			}

			widgetHandled = true;

		}

		if (nameBits[1] == "Config") {

			var selectIdx = inWidget.selectedIndex;

			this.cargoType = eval(inWidget.options[selectIdx].value);

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function CAR_Report() {

	//	Calculate hold sizes

	var holds = new Array(0, 0, 0, 0);

	var holdIdx = 0;

	var idx = 0;

	for (idx = 0; idx < this.capacity; idx++) {

		holdIdx = idx % 4;

		holds[holdIdx]++;

	}



	var temp = "";

	var prefix = TableCargoType[this.cargoType].substring(0, 1);

	for (holdIdx = 0; holdIdx < 4; holdIdx++) {

		temp += prefix + holds[holdIdx] + "&nbsp;";

	}



	var outText = TableRow("<b>Cargo Space", temp);

	return (outText);

}





function CloakingSystem() {



	//	Attributes

	this.objectId = 0;



	//	Methods

	this.Cost = CLOK_Cost;

	this.GetFormWidgets = CLOK_GetFormWidgets;

	this.Mass = CLOK_Mass;

	this.Report = CLOK_Report;

	this.ObjectId = NULS_ObjectId;

	this.ProcessChange = NULS_ProcessChange;

}



function CLOK_Cost(inShipDisplacement) {

	return (10 * this.Mass(inShipDisplacement));

}

function CLOK_GetFormWidgets(inShipDisplacement) {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Cloaking Field</b>", "", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function CLOK_Mass(inShipDisplacement) {

	return (Math.max(2, Math.round(inShipDisplacement * 0.1)));

}

function CLOK_Report() {

	var outText = TableRow("<b>Cloaking Field</b>");

	return (outText);

}





function FighterSystem() {



	//	Attributes

	this.fighterBayCount = 1;

	this.fighterType = 0;

	this.objectId = 0;

	this.pointCost = 0;



	//	Methods

	this.Cost = FTR_Cost;

	this.GetFormWidgets = FTR_GetFormWidgets;

	this.Mass = FTR_Mass;

	this.ProcessChange = FTR_ProcessChange;

	this.Report = FTR_Report;

	this.ObjectId = NULS_ObjectId;

}



function FTR_Cost() {

	return ((27 + this.pointCost) * this.fighterBayCount);

}

function FTR_GetFormWidgets(inShipDisplacement) {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Fighter Bay</b>", SelectWidget("FTR_Type_" + this.ObjectId(), TableFighterType, this.fighterType, "parent.Recalc(this);") + "&nbsp; <b>Bays</b>" + TextWidget("FTR_Count_" + this.ObjectId(), 2, this.fighterBayCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function FTR_Mass() {

	return (9 * this.fighterBayCount);

}

function FTR_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "FTR") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Type") {

			var selectIdx = inWidget.selectedIndex;

			this.fighterType = eval(inWidget.options[selectIdx].value);

			var pointCosts = new Array(0, 18, 30, 24, 18, 24, 24, 36);

			this.pointCost = pointCosts[this.fighterType];

			widgetHandled = true;

		}

		if (nameBits[1] == "Count") {

			this.fighterBayCount = eval(inWidget.value);

			if (this.fighterBayCount < 1) {

				this.fighterBayCount = 1;

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function FTR_Report() {

	var detail = "";

	if (this.fighterBayCount > 1) {

		detail += "(" + this.fighterBayCount + ") ";

	}

	detail += TableFighterType[this.fighterType];

	var outText = TableRow("<b>Fighter Bay</b>", detail);

	return (outText);

}





function FireConSystem() {



	//	Attributes

	this.fcsCount = 1;

	this.objectId = 0;



	//	Methods

	this.Cost = NULS_Cost4X;

	this.GetFormWidgets = FCS_GetFormWidgets;

	this.Mass = FCS_Mass;

	this.ProcessChange = FCS_ProcessChange;

	this.Report = FCS_Report;

	this.ObjectId = NULS_ObjectId;

}



function FCS_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Fire Control System</b>", " <b>Qty</b>" + TextWidget("FCS_Count_" + this.ObjectId(), 2, this.fcsCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function FCS_Mass() {

	return (this.fcsCount);

}

function FCS_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "FCS") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Count") {

			this.fcsCount = eval(inWidget.value);

			if (this.fcsCount < 1) {

				this.fcsCount = 1;

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function FCS_Report() {

	var outText = TableRow("<b>Fire Control System</b>", "(" + this.fcsCount + ")");

	return (outText);

}





function HangarSystem() {



	//	Attributes

	this.capacity = 6;

	this.includeCraft = true;

	this.objectId = 0;



	//	Methods

	this.Cost = HANG_Cost;

	this.GetFormWidgets = HANG_GetFormWidgets;

	this.Mass = HANG_Mass;

	this.ProcessChange = HANG_ProcessChange;

	this.Report = HANG_Report;

	this.ObjectId = NULS_ObjectId;

}



function HANG_Cost() {

	var cost = 3 * this.Mass();

	if (this.includeCraft) {

		cost += 2 * this.capacity;

	}

	return (cost);

}

function HANG_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Hangar Bay</b>", "<b>Capacity</b>&nbsp;" + TextWidget("HANG_Displ_" + this.ObjectId(), 2, this.capacity, "parent.Recalc(this);") + "&nbsp;(mass of craft carried) " + " &nbsp;" + CheckboxWidget("HANG_IncludeCraft_" + this.ObjectId(), this.includeCraft, "parent.Recalc(this);") + "Include Craft", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function HANG_Mass() {

	return (Math.round(this.capacity * 1.5));

}

function HANG_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "HANG") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget

		if (nameBits[1] == "Displ") {

			this.capacity = eval(inWidget.value);

			widgetHandled = true;

		}

		if (nameBits[1] == "IncludeCraft") {

			this.includeCraft = inWidget.checked;

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function HANG_Report() {

	var content = "Cap: " + this.capacity + " mass of craft";

	if (this.includeCraft) {

		content += " (craft included)";

	}

	var outText = TableRow("<b>Hangar Bay</b>", content);

	return (outText);

}





function MineLayerSystem() {



	//	Attributes

	this.mines = 2;

	this.objectId = 0;



	//	Methods

	this.Cost = MLAY_Cost;

	this.GetFormWidgets = MLAY_GetFormWidgets;

	this.Mass = MLAY_Mass;

	this.ProcessChange = MLAY_ProcessChange;

	this.Report = MLAY_Report;

	this.ObjectId = NULS_ObjectId;

}



function MLAY_Cost() {

	return (6 + 2 * this.mines);

}

function MLAY_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Mine Layer</b>", "<b>Mines</b> " + TextWidget("MLAY_Mines_" + this.ObjectId(), 4, this.mines, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function MLAY_Mass() {

	return (2 + this.mines);

}

function MLAY_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "MLAY") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget

		if (nameBits[1] == "Mines") {

			this.mines = eval(inWidget.value);

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function MLAY_Report() {

	var outText = TableRow("<b>Mine Layer", this.mines + " mines");

	return (outText);

}





function MineSweeperSystem(objectId) {



	//	Attributes

	this.objectId = (objectId == null) ? 0 : objectId;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.GetFormWidgets = MSWP_GetFormWidgets;

	this.Mass = MSWP_Mass;

	this.Report = MSWP_Report;

	this.ObjectId = NULS_ObjectId;

	this.ProcessChange = NULS_ProcessChange;

}



function MSWP_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Mine Sweeper</b>", "", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function MSWP_Mass() {

	return (5);

}

function MSWP_Report() {

	var outText = TableRow("<b>Mine Sweeper");

	return (outText);

}





function MissileSystem() {



	//	Attributes

	this.desc = "Normal";

	this.missileCount = 1;

	this.missileType = 0;

	this.objectId = 0;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.GetFormWidgets = MSL_GetFormWidgets;

	this.Mass = MSL_Mass;

	this.ProcessChange = MSL_ProcessChange;

	this.Report = MSL_Report;

	this.ObjectId = NULS_ObjectId;

}



function MSL_GetFormWidgets(inShipDisplacement) {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>MT Missile(s)</b>", "<b>Type</b>" + SelectWidget("MSL_Type_" + this.ObjectId(), TableMissileType, this.missileType, "parent.Recalc(this);") + " <b>Qty</b>" + TextWidget("MSL_Count_" + this.ObjectId(), 2, this.missileCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function MSL_Mass() {

	return (2 * this.missileCount);

}

function MSL_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "MSL") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Type") {

			var selectIdx = inWidget.selectedIndex;

			var selectValue = eval(inWidget.options[selectIdx].value);

			this.missileType = selectValue;

			this.desc = TableMissileType[selectValue];

			widgetHandled = true;

		}

		if (nameBits[1] == "Count") {

			this.missileCount = eval(inWidget.value);

			if (this.missileCount < 1) {

				this.missileCount = 1;

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function MSL_Report() {

	var title = "MT Missile";

	var detail = this.desc;

	if (this.missileCount > 1) {

		title += "s";

		detail = "(" + this.missileCount + ") " + this.desc;

	}

	var outText = TableRow(title, detail);

	return (outText);

}





function NeedleBeamSystem() {



	//	Attributes

	this.arcs = new ArcInfo();

	this.objectId = 0;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.GetFormWidgets = NBS_GetFormWidgets;

	this.Mass = NBS_Mass;

	this.ProcessChange = NBS_ProcessChange;

	this.Report = NBS_Report;

	this.ObjectId = NULS_ObjectId;

}



function NBS_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Needle Beam</b>", NestedTable(this.arcs.GetFormWidgets()), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function NBS_Mass() {

	return (2);

}

function NBS_ProcessChange(inWidget) {

	var widgetHandled = this.arcs.ProcessChange(inWidget);

	if (widgetHandled) {

		if (this.arcs.NumArcs() == 0) {

			this.arcs.arcF = true;

			this.arcs.arcFP = this.arcs.arcFS = this.arcs.arcAS = this.arcs.arcA = this.arcs.arcAP = false;

		} else {

			if (this.arcs.NumArcs() != 1) {

				//	Munge the arcs

				var widgetName = inWidget.name;

				var nameBits = widgetName.split("_");

				if (nameBits[1] == "F") {

					this.arcs.arcF = true;

					this.arcs.arcFP = this.arcs.arcFS = this.arcs.arcAS = this.arcs.arcA = this.arcs.arcAP = false;

				}

				if (nameBits[1] == "FP") {

					this.arcs.arcFP = true;

					this.arcs.arcF = this.arcs.arcFS = this.arcs.arcAS = this.arcs.arcA = this.arcs.arcAP = false;

				}

				if (nameBits[1] == "FS") {

					this.arcs.arcFS = true;

					this.arcs.arcF = this.arcs.arcFP = this.arcs.arcAS = this.arcs.arcA = this.arcs.arcAP = false;

				}

				if (nameBits[1] == "A") {

					this.arcs.arcA = true;

					this.arcs.arcF = this.arcs.arcFP = this.arcs.arcFS = this.arcs.arcAS = this.arcs.arcAP = false;

				}

				if (nameBits[1] == "AP") {

					this.arcs.arcAP = true;

					this.arcs.arcF = this.arcs.arcFP = this.arcs.arcFS = this.arcs.arcAS = this.arcs.arcA = false;

				}

				if (nameBits[1] == "AS") {

					this.arcs.arcAS = true;

					this.arcs.arcF = this.arcs.arcFP = this.arcs.arcFS = this.arcs.arcA = this.arcs.arcAP = false;

				}

			}

		}

		this.arcs.UpdateWidgets(inWidget.form);

	}

	return (widgetHandled);

}

function NBS_Report() {

	var outText = TableRow("<b>Needle Beam</b>", this.arcs.Report());

	return (outText);

}





function NovaCannonSystem() {



	//	Attributes

	this.objectId = 0;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.GetFormWidgets = NOVA_GetFormWidgets;

	this.Mass = NOVA_Mass;

	this.Report = NOVA_Report;

	this.ObjectId = NULS_ObjectId;

	this.ProcessChange = NULS_ProcessChange;

}



function NOVA_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Nova Cannon</b>", "", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function NOVA_Mass() {

	return (20);

}

function NOVA_Report() {

	var outText = TableRow("<b>Nova Cannon</b>");

	return (outText);

}





function NullSystem() {



	//	Attributes



	//	Methods

	this.Cost = NULS_Cost3X;

	this.Cost2X = NULS_Cost2X;

	this.Cost3X = NULS_Cost3X;

	this.Cost4X = NULS_Cost4X;

	this.Cost5X = NULS_Cost5X;

	this.CostZero = NULS_CostZero;

	this.GetFormWidgets = NULS_GetFormWidgets;

	this.Mass = NULS_Mass;

	this.ObjectId = NULS_ObjectId;

	this.ProcessChange = NULS_ProcessChange;

	this.Report = NULS_Report;

}



function NULS_Cost(inShipDisplacement) {

	return (NULS_Cost * this.Mass(inShipDisplacement));

}

function NULS_Cost3X(inShipDisplacement) {

	return (3 * this.Mass(inShipDisplacement));

}

function NULS_Cost4X(inShipDisplacement) {

	return (4 * this.Mass(inShipDisplacement));

}

function NULS_Cost5X(inShipDisplacement) {

	return (5 * this.Mass(inShipDisplacement));

}

function NULS_CostZero(inShipDisplacement) {

	return (0);

}

function NULS_GetFormWidgets() {

	return ("");

}

function NULS_Mass(inShipDisplacement) {

	return (0);

}

function NULS_ObjectId() {

	if ((this.objectId == null) || (this.objectId == 0)) {

		this.objectId = gIdGen.NewId();

	}

	return (this.objectId);

}

function NULS_ProcessChange(inWidget) {

	return (false);

}

function NULS_Report() {

	return ("");

}





function OrtillerySystem() {



	//	Attributes

	this.objectId = 0;

	this.ortCount = 1;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = ORT_GetFormWidgets;

	this.Mass = ORT_Mass;

	this.ProcessChange = ORT_ProcessChange;

	this.Report = ORT_Report;

}



function ORT_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Ortillery</b>", " <b>Qty</b>" + TextWidget("ORT_Count_" + this.ObjectId(), 2, this.ortCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function ORT_Mass(inShipDisplacement) {

	return (3 * this.ortCount);

}

function ORT_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "ORT") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Count") {

			this.ortCount = eval(inWidget.value);

			if (this.ortCount < 1) {

				this.ortCount = 1;

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function ORT_Report() {

	var outText = TableRow("<b>Ortillery</b>", "(" + this.ortCount + ")");

	return (outText);

}





function PDSSystem() {



	//	Attributes

	this.objectId = 0;

	this.pdsCount = 1;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = PDS_GetFormWidgets;

	this.Mass = PDS_Mass;

	this.ProcessChange = PDS_ProcessChange;

	this.Report = PDS_Report;

	this.UpdateWidgets = PDS_UpdateWidgets;

}



function PDS_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>PDS</b>", " <b>Qty</b>" + TextWidget("PDS_Count_" + this.ObjectId(), 2, this.pdsCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function PDS_Mass() {

	return (this.pdsCount);

}

function PDS_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "PDS") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Count") {

			this.pdsCount = eval(inWidget.value);

			if (this.pdsCount < 1) {

				this.pdsCount = 1;

			}

			this.UpdateWidgets(inWidget.form);

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function PDS_Report() {

	var outText = TableRow("<b>PDS</b>", "(" + this.pdsCount + ")");

	return (outText);

}

function PDS_UpdateWidgets(inForm) {

	if (inForm == null) {

		alert("inForm is null");

		return;

	}

	var cmd = "inForm.PDS_Count_" + this.ObjectId() + ".value = this.pdsCount";

	eval(cmd);

}





function PulseTorpSystem() {



	//	Attributes

	this.arcs = new ArcInfo();

	this.objectId = 0;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = PTS_GetFormWidgets;

	this.Mass = PTS_Mass;

	this.ProcessChange = PTS_ProcessChange;

	this.Report = PTS_Report;

}



function PTS_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Pulse Torpedo Launcher</b>", NestedTable(this.arcs.GetFormWidgets()), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function PTS_Mass() {

	return (4 + (this.arcs.NumArcs() - 1));

}

function PTS_ProcessChange(inWidget) {

	var widgetHandled = this.arcs.ProcessChange(inWidget);

	if (widgetHandled) {

		if (this.arcs.NumArcs() == 0) {

			this.arcs.arcF = true;

		} else {

			if (this.arcs.NumArcs() > 3) {

				//	Munge the arcs

				var widgetName = inWidget.name;

				var nameBits = widgetName.split("_");

				if (nameBits[1] == "F") {

					this.arcs.arcFP = this.arcs.arcFS = this.arcs.arcF;

					this.arcs.arcAS = this.arcs.arcA = this.arcs.arcAP = false;

				}

				if (nameBits[1] == "FP") {

					this.arcs.arcAP = this.arcs.arcF = this.arcs.arcFP;

					this.arcs.arcAS = this.arcs.arcA = this.arcs.arcFS = false;

				}

				if (nameBits[1] == "FS") {

					this.arcs.arcAS = this.arcs.arcF = this.arcs.arcFS;

					this.arcs.arcFP = this.arcs.arcA = this.arcs.arcAP = false;

				}

				if (nameBits[1] == "A") {

					this.arcs.arcAP = this.arcs.arcAS = this.arcs.arcA;

					this.arcs.arcFP = this.arcs.arcF = this.arcs.arcFS = false;

				}

				if (nameBits[1] == "AP") {

					this.arcs.arcFP = this.arcs.arcA = this.arcs.arcAP;

					this.arcs.arcAS = this.arcs.arcFS = this.arcs.arcF = false;

				}

				if (nameBits[1] == "AS") {

					this.arcs.arcFS = this.arcs.arcA = this.arcs.arcAS;

					this.arcs.arcF = this.arcs.arcFP = this.arcs.arcAP = false;

				}

			}

		}

		this.arcs.UpdateWidgets(inWidget.form);

	}

	return (widgetHandled);

}

function PTS_Report() {

	var outText = TableRow("<b>Pulse Torpedo Launcher</b>", this.arcs.Report());

	return (outText);

}





function ReflexSystem() {



	//	Attributes

	this.objectId = 0;



	//	Methods

	this.ObjectId = NULS_ObjectId;

	this.ProcessChange = NULS_ProcessChange;

	this.Cost = RFLX_Cost;

	this.GetFormWidgets = RFLX_GetFormWidgets;

	this.Mass = RFLX_Mass;

	this.Report = RFLX_Report;

}



function RFLX_Cost(inShipDisplacement) {

	return (6 * this.Mass(inShipDisplacement));

}

function RFLX_GetFormWidgets(inShipDisplacement) {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Reflex Field</b>", "", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function RFLX_Mass(inShipDisplacement) {

	return (Math.max(10, Math.round(inShipDisplacement * 0.1)));

}

function RFLX_Report() {

	var outText = TableRow("<b>Reflex Field</b>");

	return (outText);

}





function ScreenSystem() {



	//	Attributes

	this.objectId = 0;

	this.screenLevel = 1;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = SCRN_GetFormWidgets;

	this.Mass = SCRN_Mass;

	this.ProcessChange = SCRN_ProcessChange;

	this.Report = SCRN_Report;

}



function SCRN_GetFormWidgets(inShipDisplacement) {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Screen</b>", "<b>Level</b> " + TextWidget("SCRN_Level_" + this.ObjectId(), 2, this.screenLevel, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function SCRN_Mass(inShipDisplacement) {

	var baseMass = 3;

	var tempLevel = this.screenLevel;

	var massFactor = 0.05;

	while (tempLevel > 1) {

		baseMass *= 2;

		massFactor *= 2;

		tempLevel--;

	}

	return (Math.max(baseMass, Math.round(inShipDisplacement * massFactor)));

}

function SCRN_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "SCRN") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget

		if (nameBits[1] == "Level") {

			this.screenLevel = eval(inWidget.value);

			if (this.screenLevel > 5) {

				this.screenLevel = 5;

			}

			if (this.screenLevel < 1) {

				this.screenLevel = 1;

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function SCRN_Report() {

	var outText = TableRow("<b>Screen", "Level " + this.screenLevel + "<br>");

	return (outText);

}





function SMLSystem() {



	//	Attributes

	this.objectId = 0;

	this.smlCount = 1;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = SML_GetFormWidgets;

	this.Mass = SML_Mass;

	this.ProcessChange = SML_ProcessChange;

	this.Report = SML_Report;

	this.UpdateWidgets = SML_UpdateWidgets;

}



function SML_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>SML</b>", " <b>Qty</b>" + TextWidget("SML_Count_" + this.ObjectId(), 2, this.smlCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function SML_Mass() {

	return (3 * this.smlCount);

}

function SML_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "SML") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Count") {

			this.smlCount = eval(inWidget.value);

			if (this.smlCount < 1) {

				this.smlCount = 1;

			}

			this.UpdateWidgets(inWidget.form);

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function SML_Report() {

	detail = "";

	if (this.smlCount > 1) {

		detail = "(" + this.smlCount + ")";

	}

	var outText = TableRow("<b>SML</b>", detail);

	return (outText);

}

function SML_UpdateWidgets(inForm) {

	if (inForm == null) {

		alert("inForm is null");

		return;

	}

	var cmd = "inForm.SML_Count_" + this.ObjectId() + ".value = this.smlCount";

	eval(cmd);

}





function SMMSystem() {



	//	Attributes

	this.capacity = 6;

	this.objectId = 0;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = SMM_GetFormWidgets;

	this.Mass = SMM_Mass;

	this.ProcessChange = SMM_ProcessChange;

	this.Report = SMM_Report;

}



function SMM_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>SM Magazine</b>", "<b>Capacity</b> " + TextWidget("SMM_Capacity_" + this.ObjectId(), 2, this.capacity, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function SMM_Mass() {

	return (this.capacity);

}

function SMM_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "SMM") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget

		if (nameBits[1] == "Capacity") {

			this.capacity = eval(inWidget.value);

			var divBy2 = (this.capacity % 2 == 0);

			var divBy3 = (this.capacity % 3 == 0);

			if (!(divBy2 || divBy3)) {

				//	Round up to a full salvo

				if (this.capacity <= 0) {

					this.capacity = 1;

				}

				this.capacity += 1;

			}

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function SMM_Report() {

	var outText = TableRow("<b>SM Magazine", "Cap: " + this.capacity + "<br>" + "(" + Math.floor(this.capacity / 2) + " / " + Math.floor(this.capacity / 3) + " ER salvos)");

	return (outText);

}





function SMPSystem() {



	//	Attributes

	this.objectId = 0;

	this.smpCount = 1;



	//	Methods

	this.Cost = NULS_Cost3X;

	this.ObjectId = NULS_ObjectId;

	this.GetFormWidgets = SMP_GetFormWidgets;

	this.Mass = SMP_Mass;

	this.ProcessChange = SMP_ProcessChange;

	this.Report = SMP_Report;

	this.UpdateWidgets = SMP_UpdateWidgets;

}



function SMP_GetFormWidgets() {

	var colAlign = "ALN:,,right";

	var outText = TableRow(colAlign, "<b>Submunitions Pack</b>", "<b>Qty</b> " + TextWidget("SMP_Count_" + this.ObjectId(), 2, this.smpCount, "parent.Recalc(this);"), ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function SMP_Mass() {

	return (this.smpCount);

}

function SMP_ProcessChange(inWidget) {

	//	Process a widget change-of-value



	var widgetHandled = false;

	var widgetName = inWidget.name;

	var nameBits = widgetName.split("_");



	if ((nameBits[0] == "SMP") && (nameBits[2] == ("" + this.ObjectId()))) {

		if (nameBits[1] == "Count") {

			this.smpCount = eval(inWidget.value);

			if (this.smpCount < 1) {

				this.smpCount = 1;

			}

			this.UpdateWidgets(inWidget.form);

			widgetHandled = true;

		}

	}



	return (widgetHandled);

}

function SMP_Report() {
	var detail = "";
	if (this.smpCount > 1) {
		detail += "(" + this.smpCount + ")";
	}

	var outText = TableRow("<b>Submunitions Pack</b>", detail);
	return (outText);
}

function SMP_UpdateWidgets(inForm) {
	if (inForm == null) {
		alert("inForm is null");
		return;
	}

	var cmd = "inForm.SMP_Count_" + this.ObjectId() + ".value = this.smpCount";
	eval(cmd);
}


function SMRSystem() {

	//	Attributes
	this.ER = false;
	this.objectId = 0;
	this.smrCount = 1;

	//	Methods
	this.Cost = NULS_Cost3X;
	this.ObjectId = NULS_ObjectId;
	this.GetFormWidgets = SMR_GetFormWidgets;
	this.Mass = SMR_Mass;
	this.ProcessChange = SMR_ProcessChange;
	this.Report = SMR_Report;
	this.UpdateWidgets = SMR_UpdateWidgets;
}



function SMR_GetFormWidgets() {
	var colAlign = "ALN:,,right,right,";
	var outText = TableRow(colAlign, "<b>SMR</b>", "<b>Qty</b> " + TextWidget("SMR_Count_" + this.ObjectId(), 2, this.smrCount, "parent.Recalc(this);") + "&nbsp; " + CheckboxWidget("SMR_ER_" + this.ObjectId(), this.ER, "parent.Recalc(this);") + "<b>Extended Range</b>", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";
	return (outText);

}

function SMR_Mass() {
	return (((this.ER) ? 5 : 4) * this.smrCount);
}

function SMR_ProcessChange(inWidget) {

	//	Process a widget change-of-value
	var widgetHandled = false;
	var widgetName = inWidget.name;
	var nameBits = widgetName.split("_");

	if ((nameBits[0] == "SMR") && (nameBits[2] == ("" + this.ObjectId()))) {

		//	It's my widget
		if (nameBits[1] == "ER") {
			this.ER = inWidget.checked;
			widgetHandled = true;
		}

		if (nameBits[1] == "Count") {
			this.smrCount = eval(inWidget.value);
			if (this.smrCount < 1) {
				this.smrCount = 1;
			}

			this.UpdateWidgets(inWidget.form);
			widgetHandled = true;
		}
	}



	return (widgetHandled);

}

function SMR_Report() {
	var detail = "";
	if (this.smrCount > 1) {
		detail += "(" + this.smrCount + ") ";
	}

	if (this.ER) {
		detail += "ER";
	}

	var outText = TableRow("<b>SMR", detail);
	return (outText);
}

function SMR_UpdateWidgets(inForm) {
	if (inForm == null) {
		alert("inForm is null");
		return;
	}

	var cmd = "inForm.SMR_Count_" + this.ObjectId() + ".value = this.smrCount;";
	cmd += "inForm.SMR_ER_" + this.ObjectId() + ".checked = this.ER;";
	eval(cmd);
}





function WaveGunSystem() {

	//	Attributes
	this.objectId = 0;

	//	Methods
	this.Cost = NULS_Cost3X;
	this.ObjectId = NULS_ObjectId;
	this.ProcessChange = NULS_ProcessChange;
	this.GetFormWidgets = WGUN_GetFormWidgets;
	this.Mass = WGUN_Mass;
	this.Report = WGUN_Report;
}



function WGUN_GetFormWidgets() {

	var colAlign = "ALN:,,right,right,";

	var outText = TableRow(colAlign, "<b>Wave Gun</b>", "", ButtonWidget("System_Delete_" + this.ObjectId(), "Delete", "parent.Recalc(this);")) + "\r";

	return (outText);

}

function WGUN_Mass() {

	return (12);

}

function WGUN_Report() {

	var outText = TableRow("<b>Wave Gun</b>");

	return (outText);

}







//	=======	MODULE:	Tables	========

var TableActiveSensors = new Array();
TableActiveSensors[0] = new String("Basic");
TableActiveSensors[1] = new String("Enhanced");
TableActiveSensors[2] = new String("Superior");

var TableAddSystem = new Array();
TableAddSystem[0] = new SystemDescriptor("ADFC - Area Defense Firecon", "ADFCSystem");
TableAddSystem[1] = new SystemDescriptor("Beam Battery", "BeamSystem");
TableAddSystem[2] = new SystemDescriptor("Cargo/Passenger Space", "CargoSystem");
TableAddSystem[3] = new SystemDescriptor("Fighter Bay", "FighterSystem");
TableAddSystem[4] = new SystemDescriptor("FCS - Fire Control System", "FireConSystem");
TableAddSystem[5] = new SystemDescriptor("Hangar Bay", "HangarSystem");
TableAddSystem[6] = new SystemDescriptor("Mine Layer", "MineLayerSystem");
TableAddSystem[7] = new SystemDescriptor("Mine Sweeper", "MineSweeperSystem");
TableAddSystem[8] = new SystemDescriptor("Missile (MT type)", "MissileSystem");
TableAddSystem[9] = new SystemDescriptor("Needle Beam", "NeedleBeamSystem");
TableAddSystem[10] = new SystemDescriptor("Ortillery System", "OrtillerySystem");
TableAddSystem[11] = new SystemDescriptor("PDS - Point-Defense System", "PDSSystem");
TableAddSystem[12] = new SystemDescriptor("Pulse Torpedo Launcher", "PulseTorpSystem");
TableAddSystem[13] = new SystemDescriptor("Screen System", "ScreenSystem");
TableAddSystem[14] = new SystemDescriptor("SML - Salvo Missile Launcher", "SMLSystem");
TableAddSystem[15] = new SystemDescriptor("SMM - Salvo Missile Magazine", "SMMSystem");
TableAddSystem[16] = new SystemDescriptor("SMP - Submunitions Pack", "SMPSystem");
TableAddSystem[17] = new SystemDescriptor("SMR - Salvo Missile Rack", "SMRSystem");
TableAddSystem[18] = new SystemDescriptor("Cloaking Field", "CloakingSystem");
TableAddSystem[19] = new SystemDescriptor("Nova Cannon (Spinal Mount)", "NovaCannonSystem");
TableAddSystem[20] = new SystemDescriptor("Reflex Field", "ReflexSystem");
TableAddSystem[21] = new SystemDescriptor("Wave Gun", "WaveGunSystem");

var TableCargoType = new Array();
TableCargoType[0] = new String("H - Bulk Cargo");
TableCargoType[1] = new String("P - Passengers");
TableCargoType[2] = new String("S - Scientific Labs");
TableCargoType[3] = new String("T - Troop Carrier");

var TableECM = new Array();
TableECM[0] = new String("None");
TableECM[1] = new String("Individual");
TableECM[2] = new String("Area-Effect");

var TableFighterType = new Array();
TableFighterType[0] = new String("Empty Bay");
TableFighterType[1] = new String("Standard Fighters");
TableFighterType[2] = new String("Heavy Fighters");
TableFighterType[3] = new String("Fast Fighters");
TableFighterType[4] = new String("Interceptors");
TableFighterType[5] = new String("Attack Fighters");
TableFighterType[6] = new String("Long-Range Fighters");
TableFighterType[7] = new String("Torpedo Fighters");

var TableHull = new Array();
TableHull[0] = new HullInfo("Fragile", 0.1, 0);
TableHull[1] = new HullInfo("Weak", 0.2, 1);
TableHull[2] = new HullInfo("Average", 0.3, 2);
TableHull[3] = new HullInfo("Strong", 0.4, 3);
TableHull[4] = new HullInfo("Super", 0.5, 4);

var TableMissileType = new Array();
TableMissileType[0] = new String("Normal");
TableMissileType[1] = new String("EMP");
TableMissileType[2] = new String("Needle");

var TableShipType = new Array();
TableShipType[0] = new ShipTypeInfo(0.05, "Military", 0);
TableShipType[1] = new ShipTypeInfo(0.02, "Merchant/Civilian", 1);

var TableStreamlining = new Array();
TableStreamlining[0] = new StreamliningInfo("None", 0.0, 0);
TableStreamlining[1] = new StreamliningInfo("Partial", 0.1, 1);
TableStreamlining[2] = new StreamliningInfo("Full", 0.2, 2);

var gShipDesign = new ShipDesign;
var gIdGen = new IdGenerator;
var gTableFontTag = "<font face='sans-serif' size=-1>";
var gMustUpdateDisplay = false;

parent.input_frame_source = "";
parent.output_frame_source = "";

function ShowInfo(inWidget) {
	var selectIdx = inWidget.selectedIndex;
	var selectValue = inWidget.options[selectIdx].value;
	parent.output_frame.document.location = selectValue;
}


function UpdateFrames() {

	if (gMustUpdateDisplay) {

		//	Recalculate and reload the input frame
		parent.input_frame_source = gShipDesign.GetForm();

		if (input_frame.document.location == 'javascript:parent.input_frame_source') {
			input_frame.document.location.reload();
		} else {
			input_frame.document.location = 'javascript:parent.input_frame_source';
		}
		gMustUpdateDisplay = false;
	}
	parent.output_frame_source = gShipDesign.Report();

	//	Reload the output frame
	if (output_frame.document.location == 'javascript:parent.output_frame_source') {
		output_frame.document.location.reload();
	} else {
		output_frame.document.location = 'javascript:parent.output_frame_source';
	}
}


function InitializeFrames() {
	gShipDesign.Recalculate();
	gMustUpdateDisplay = true;
	UpdateFrames();
}


function Recalc(inWidget) {

var widgetName = inWidget.name;
var nameBits = widgetName.split("_");

if (nameBits[0] == "Form") {
		if (nameBits[1] == "ResetForm") {
			gShipDesign = new ShipDesign;
			gMustUpdateDisplay = true;
		} else {
			alert("Unknown widget \"" + inWidget.name + "\"");
		}
	} else {
		gShipDesign.Recalc(inWidget);
	}
	UpdateFrames();
}
