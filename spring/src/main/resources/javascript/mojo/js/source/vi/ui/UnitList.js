(function(){mstrmojo.requiresCls("mstrmojo.ListBase","mstrmojo._IsList","mstrmojo.vi.ui.DatasetUnitMenuUtils");var $DS_UTILS=mstrmojo.vi.ui.DatasetUnitMenuUtils;mstrmojo.vi.ui.UnitList=mstrmojo.declare(mstrmojo.ListBase,[mstrmojo._IsList],{scriptClass:"mstrmojo.vi.ui.UnitList",init:function init(props){this._super(props);mstrmojo.css.addWidgetCssClass(this,"mstrmojo-VIUnitList");},getItemProps:function getItemProps(item,idx){var props=this._super(item,idx);props.addCls("unit "+$DS_UTILS.getUnitCssClass(item));return props;}});}());