function doGet(e) {

  var op = e.parameter.action;

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.JAVASCRIPT);
    


}

function doPost(e) {

  var op = e.parameter.SurveyName;
 var survey=JSON.parse (e.parameter.Survey);
  var userid=e.parameter.UserId;
 
   var form = FormApp.create(op).setPublishingSummary(true).setCustomClosedFormMessage(userid).setTitle(op);
   
  for(i in survey){
     if (survey[i].id=='0' ){
     var item = form.addMultipleChoiceItem();
item.setTitle(survey[i].Question);
item.setChoices([
        item.createChoice(survey[i].Answer1),
        item.createChoice(survey[i].Answer2),
        item.createChoice(survey[i].Answer3),
         item.createChoice(survey[i].Answer4)
    ]);
 
       
     }
     if (survey[i].id=='1' ){
     form.addParagraphTextItem().setTitle(survey[i].Question);
       
     }
  if (survey[i].id=='2' ){
    form.addCheckboxItem()
    .setTitle(survey[i].Question)
    .setChoiceValues([survey[i].Answer1,survey[i].Answer2,survey[i].Answer3,survey[i].Answer4]);
        
     }
  
  
  }
  
  
  ScriptApp.newTrigger('onFormSubmit')
      .forForm(form)
      .onFormSubmit()
      .create();
  
  return ContentService.createTextOutput(form.getPublishedUrl()).setMimeType(ContentService.MimeType.JAVASCRIPT);
    
 
 

}

function onFormSubmit(e) {
var i=0;
  var Survey=[]
  var form = FormApp.openById(e.source.getId())
   
 var formResponses = form.getResponses();

  var formResponse = formResponses[formResponses.length-1];
  var itemResponses = formResponse.getItemResponses();
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    var Question = itemResponse.getItem().getTitle()
    if (itemResponse.getItem().getType()=='PARAGRAPH_TEXT')  
    {
     Survey.push({
       id: 1,question:Question,
       Answer1: itemResponse.getResponse(),
 
})                  
    }else if  (itemResponse.getItem().getType()=='CHECKBOX'){
    var id = 0;
      var Answer1='false'
      var Answer2='false'
      var Answer3='false'
      var Answer4='false'
      var response=itemResponse.getResponse()
      var Choices=itemResponse.getItem().asCheckboxItem().getChoices()
      for (var a = 0;a<4;a++){
               if(response[a]==Choices[0].getValue()){Answer1='true'}
        if(response[a]==Choices[1].getValue()){Answer2='true'}
        if(response[a]==Choices[2].getValue()){Answer3='true'}
        if(response[a]==Choices[3].getValue()){Answer4='true'}
      
      }
      
     Survey.push({
       id: id,question:Question,
       Answer1:Answer1,
       Answer2:Answer2,
       Answer3:Answer3,
       Answer4:Answer4,
 
})                  
      
    }else if (itemResponse.getItem().getType()=='MULTIPLE_CHOICE'){
     var id = 2;
      var Answer1='false'
      var Answer2='false'
      var Answer3='false'
      var Answer4='false'
      var response=itemResponse.getResponse()
      var Choices=itemResponse.getItem().asMultipleChoiceItem().getChoices()
      for (var a = 0;a<4;a++){
               if(response[a]==Choices[0].getValue()){Answer1='true'}
        if(response==Choices[1].getValue()){Answer2='true'}
        if(response==Choices[2].getValue()){Answer3='true'}
        if(response==Choices[3].getValue()){Answer4='true'}
      
      }
      
     Survey.push({
       id: id,question:Question,
       Answer1:Answer1,
       Answer2:Answer2,
       Answer3:Answer3,
       Answer4:Answer4,
 
})                  }
    
    
    
    
   
   
    
    
    
   
    
    
   
    
    
    
    Logger.log('Response #%s to the question "%s" was "%s"',
        (i + 1).toString(),
        itemResponse.getItem().getTitle(),
            Survey,'tipi=',  itemResponse.getItem().getType(),'userid',form.getCustomClosedFormMessage(),'Soru  =',Question);



  
  
  }
  var baseUrl = "yourfirebaseURL";
  var secret = "yoursecret";
  var database = FirebaseApp.getDatabaseByUrl(baseUrl, secret);
  Logger.log(database.pushData("AnswerofSurveys/"+form.getCustomClosedFormMessage()+"/"+form.getTitle()+"/Answers", Survey));

  


}
