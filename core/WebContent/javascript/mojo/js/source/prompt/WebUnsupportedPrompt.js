(function(){mstrmojo.requiresCls("mstrmojo.prompt.WebPrompt");mstrmojo.prompt.WebUnsupportedPrompt=mstrmojo.declare(mstrmojo.prompt.WebPrompt,null,{scriptClass:"mstrmojo.prompt.WebUnsupportedPrompt",answerXml:"",populate:function populate(props){this._super(props);if(props.ans&&props.ans.xml){this.answerXml=props.ans.xml;}},getAnswerXML:function getAnswerXML(){return this.answerXml;},buildShortPa:function buildShortPa(builder){builder.addRawXML(this.answerXml);},buildAnswerObject:function buildAnswerObject(){var ob=this._super();if(this.answerXml){ob.ans={xml:this.answerXml};}return ob;},supported:function supported(){return false;}});}());