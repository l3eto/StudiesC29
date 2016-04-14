/* Class DiscipleshipContainer
 *
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

var DiscipleshipContainer = function( mode ) {
    //set mode of discipleship
    this.readonly = null;
    if( mode == 'edit' ) this._readonly = false;
    if( mode == 'readonly' ) this._readonly = true;
    if( this._readonly != null ){
      //discipleships
      this._discipleships = [];
      this._discipleshipActive = false;

      //texts
      this._text = {
        _editDiscipleship : 'Editar',
        _deleteDiscipleship : 'Borrar',
        _tittle: 'Título',
        _summary : 'Resumen',
        _save : 'Guardar',
        _cancel : 'Cancelar',
        _newDiscipleship : 'Nuevo Discipulado',
        _placeHolderSummary : 'Inserte un breve resumen ...',
        _placeHolderTittle : 'Inserte un titulo ...',
        _confirmCancel : '¿Está seguro que no desea guardar los cambios?',
        _confirmDelete : '¿Está seguro que desea eliminar este Discipulado?',
        _emptyTittle : 'Porfavor, ingrese un título',
        _emptySummary : 'Porfavor, ingrese un breve resumen',
        _delete : 'Borrar'
      }

      //data php
      this._urlData = 'http://www.100.quinua.io/testPHP/test3.php';
      this._typeData = 'POST';

      //send confirm php
      this._sendURL =  'http://www.100.quinua.io/testPHP/login.php';
      this._sendType  = 'POST';

      //elementsHTML
      this._input = {
        _user : document.getElementById('input-user') || 'a',
        _pass : document.getElementById('input-pass') ||'b'
      };
      this._div = {};
      this._button = {};
      this._icon = {};

      if( this._readonly ) this.show();
      if( !this._readonly ) this.edit();
      //confirm login
      //this.sendLogin();

      //get data
      //this.getJSON();
    }
}





/* Method DiscipleshipContainer
 * get login values
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

DiscipleshipContainer.prototype.edit = function () {
  document.getElementById('input-button').addEventListener('click', this.sendLogin.bind(this) );
}





/* Method DiscipleshipContainer
 * get login values
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

DiscipleshipContainer.prototype.show = function () {
  this.removeLoader();
  this.getJSON();
}









/* Method DiscipleshipContainer
 * get login values
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

DiscipleshipContainer.prototype.getLoginValues = function () {
  return 'user='+this.getUser()+'&pass='+this.getPass();
}







/* Method DiscipleshipContainer
 * Get user
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

DiscipleshipContainer.prototype.getUser = function () {
  return document.getElementById('input-user').value;
  //return this._input._user.value;
}








/* Method DiscipleshipContainer
 * Get pass
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

DiscipleshipContainer.prototype.getPass = function () {
  return document.getElementById('input-pass').value;
  //return this._input._pass.value;
}













/* Method DiscipleshipContainer
 * Get JSON data
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

DiscipleshipContainer.prototype.sendLogin = function () {
  $.ajax({
    type: this._sendType,
    url: this._sendURL,
    data: this.getLoginValues(),
    success: function(data){
      //if( data.success ) this.getJSON();
      alert('ok');
    },
    error: function (err) {
          alert(this._noConectionMessage);
      }
  });
}








/* Method DiscipleshipContainer
 * Get JSON data
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

DiscipleshipContainer.prototype.getJSON = function () {
  $.ajax({
	    type: this._typeData,
	    url: this._urlData,
	    data: {},
	    success: function(data){
          this.setData( data );
	    }.bind(this)
	});
};



/* Method DiscipleshipContainer
 * set our Data in discipleships
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

DiscipleshipContainer.prototype.setData = function ( JSON ) {
  if( JSON.succes ){
    if( !this._readonly ){
      document.body.appendChild( this.getContainerSegments() );
      for( i in JSON.data ) {
        this._discipleships.push( new Discipleship( this , JSON.data[i] ) );
      }
      this._div._container.appendChild( this.getNewDiscipleshipSegment() );
      this.setPopUpButtons();
    }else{
      for( i in JSON.data ) {
        this._discipleships.push( new Discipleship( this , JSON.data[i] ) );
      }
      //console.log(this);
    }
  }
}





/* Method DiscipleshipContainer
 * create our div container
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

DiscipleshipContainer.prototype.getContainerSegments = function () {
  this.removeLoader();
  this._div._container = document.createElement('DIV');
  this._div._container.setAttribute('class','ui two column doubling stackable grid container');
  this._div._container.setAttribute('style','padding-top: 3.75rem');
  return this._div._container;
}








/* Method DiscipleshipContainer
 * create our div container
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

DiscipleshipContainer.prototype.removeLoader = function () {
  if( document.getElementById('data-loading') ) document.getElementById('data-loading').remove();
}









/* Method DiscipleshipContainer
 * add new Discipleship
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

DiscipleshipContainer.prototype.getNewDiscipleshipSegment = function () {
  //container for new discipleship
  this._div._new = document.createElement('DIV');
  this._div._new.setAttribute('class','column');
  //add segment to container
  this._div._segmentsDiscipleship = document.createElement('DIV');
  this._div._segmentsDiscipleship.setAttribute('class','ui segment');

  this._div._handleButton = document.createElement('DIV');
  this._div._handleButton.setAttribute('class','ui one column centered grid');
  this._div._handleButton.setAttribute('style','padding: 15px;');

  this._div._animateDiscipleship = document.createElement('DIV');
  this._div._animateDiscipleship.setAttribute('class','ui animated primary fade button');
  this._div._animateDiscipleship.setAttribute('style','width:50%;');

  this._div._visibleDiscipleship = document.createElement('DIV');
  this._div._visibleDiscipleship.setAttribute('class','visible content');

  this._icon._visibleDiscipleship = document.createElement('I');
  this._icon._visibleDiscipleship.setAttribute('class','add icon');
  this._div._visibleDiscipleship.appendChild( this._icon._visibleDiscipleship );

  this._div._hiddenDiscipleship = document.createElement('DIV');
  this._div._hiddenDiscipleship.setAttribute('class','hidden content');
  this._div._hiddenDiscipleship.appendChild( document.createTextNode( this._text._newDiscipleship ) );

  this._div._animateDiscipleship.appendChild( this._div._visibleDiscipleship );
  this._div._animateDiscipleship.appendChild( this._div._hiddenDiscipleship );
  this._div._animateDiscipleship.addEventListener('click', this.addDiscipleship.bind(this) );

  this._div._handleButton.appendChild( this._div._animateDiscipleship );

  this._div._segmentsDiscipleship.appendChild(this._div._handleButton);

  this._div._new.appendChild( this._div._segmentsDiscipleship);

  return this._div._new;
}
/*
<div class="ui animated fade button" tabindex="0">
  <div class="visible content"><i class="shop icon"></i></div>
  <div class="hidden content">$12.99 a month</div>
</div>
*/





/* Method DiscipleshipContainer
 * desactive button new if editing
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

DiscipleshipContainer.prototype.startEditDiscipleship = function () {
  this._discipleshipActive = true;
  this._div._animateDiscipleship.setAttribute('class','ui animated fade button');
}








/* Method DiscipleshipContainer
 * active button new if editing
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

DiscipleshipContainer.prototype.stopEditingDiscipleship = function () {
  this.setPopUpButtons();
  this._discipleshipActive = false;
  this._div._animateDiscipleship.setAttribute('class','ui animated primary fade button');
}








/* Method DiscipleshipContainer
 * add new discipleship container
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

 DiscipleshipContainer.prototype.addDiscipleship = function () {
   if( this._discipleshipActive ) return;
   this._div._new.remove();
   this._discipleships.push( new Discipleship(this) );
 }










/* Method DiscipleshipContainer
 * get Text button
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

DiscipleshipContainer.prototype.getEditText = function () {
  return this._text._editDiscipleship;
}






/* Method DiscipleshipContainer
 * set events of buttons
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

DiscipleshipContainer.prototype.setPopUpButtons = function () {
  $('.editing').popup({
      inline   : true,
      hoverable: true,
      position : 'bottom left',
      delay: {
        show: 150,
        hide: 400
      }
  });
}







/* Method DiscipleshipContainer
 * set events of error inputs
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

DiscipleshipContainer.prototype.setPopUpErrors = function (){
  $('.ui.form')
  .form({
    fields: {
      inputTittle: {
        identifier : 'input-tittle',
        rules: [
          {
            type   : 'required',
            prompt : this._text._emptyTittle
          }
        ]
      },
      inputSummary: {
        identifier : 'input-summary',
        //optional   : true,
        rules: [
          {
            type   : 'required',
            prompt : this._text._emptySummary
          }
        ]
      }
    },
    inline : true,
    on     : 'blur'
  }).bind(this);
}













/* Class Discipleship
 *
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

var Discipleship = function( parent , JSON ){
  this._parent = parent;
  if( !JSON ) JSON = {};
  this._data = {
    _tittle : JSON.Topic || '',
    _index : JSON.Index || '',
    _summary : JSON.Summary || ''
  };
  this._div = {};
  this._input = {};
  this._label = {};
  this._button = {};
  this._icon = {};
  this._form = {};
  if( !parent._readonly ) this.setColumn();
  if( parent._readonly ) this.showDiscipleship();
}







/* Method Discipleship
 * create column div
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

 Discipleship.prototype.setColumn = function(){
   this._div._column = document.createElement('DIV');
   this._div._column.setAttribute('class','column');
   this._parent._div._container.appendChild(this._div._column);
   this.setSegment();
 }





/* Method Discipleship
 * create segments div
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.setSegment = function(){
  this._div._segments = document.createElement('DIV');
  this._div._segments.setAttribute('class','ui segments');
  this._div._column.appendChild(this._div._segments);
  this._div._segments.appendChild( this.getTitleSegment() );
  this._div._segments.appendChild( this.getSummarySegment() );
  //check if is a new discipleship set edit mode
  if( this.getTittle() == '' && this.getIndex() == '' && this.getSummary() == '' ) this.startEditDiscipleship();
}







/* Method Discipleship
 * get tittle segment
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.getTitleSegment = function(){
  this._div._tittle = document.createElement('DIV');
  this._div._tittle.setAttribute('class','ui segment');
  this._div._tittle.setAttribute('style','display:inline-flex;width:100%;');
  this._div._tittle.appendChild( this.getTitleDiv()  );
  this._div._tittle.appendChild( this.getEditButton() );
  return this._div._tittle;
}





/* Method Discipleship
 * getTitle div
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.getTitleDiv = function(){
  this._label._tittle = document.createElement('H2');
  this._label._tittle.setAttribute('style','width:100%;margin:auto;');
  this._label._tittle.appendChild( document.createTextNode( this.getTittle() ) );
  return this._label._tittle;
}





/* Method Discipleship
 * create our Summary
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.getSummarySegment = function(){
  this._div._summary = document.createElement('DIV');
  this._div._summary.setAttribute('class','ui segment');
  this._div._summary.appendChild( this.getSummaryDiv()  );
  return this._div._summary;
}




/* Method Discipleship
 * getsummary div
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.getSummaryDiv = function(){
  this._label._summary = document.createElement('P');
  this._label._summary.appendChild( document.createTextNode( this.getSummary() ) );
  return this._label._summary;
}






/* Method Discipleship
 * getTitle div
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.getEditButton = function(){
  this._div._buttonsEdit = document.createElement('DIV');
  this._div._buttonsEdit.setAttribute('class','ui icon right floated buttons');

  this._icon._edit = document.createElement('I');
  this._icon._edit.setAttribute('class','edit black icon');
  this._button._edit = document.createElement('BUTTON');
  this._button._edit.setAttribute('class','ui button editing');
  this._button._edit.appendChild( this._icon._edit );
  this._button._edit.setAttribute('data-content', this._parent._text._editDiscipleship );
  this._button._edit.setAttribute('data-variation', 'inverted' );
  this._button._edit.addEventListener('click', this.startEditDiscipleship.bind(this) );

  this._icon._delete = document.createElement('I');
  this._icon._delete.setAttribute('class','trash outline black icon');
  this._button._delete = document.createElement('BUTTON');
  this._button._delete.setAttribute('class','ui button editing');
  this._button._delete.appendChild( this._icon._delete );
  this._button._delete.setAttribute('data-content', this._parent._text._deleteDiscipleship );
  this._button._delete.setAttribute('data-variation', 'inverted' );
  this._button._delete.addEventListener('click', this.deleteDiscipleship.bind(this) );

  this._div._buttonsEdit.appendChild( this._button._edit );
  this._div._buttonsEdit.appendChild( this._button._delete );

  return this._div._buttonsEdit;
}










/* Method Discipleship
 * delete discipleship
 * @author Juan Acuña - Beru
 * @update 24/03/2015
 */

Discipleship.prototype.deleteDiscipleship = function () {
  if( confirm( this._parent._text._confirmDelete ) ){
    this._div._column.remove();
  }
}












/* Method Discipleship
 * edit discipleship
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.startEditDiscipleship = function(){
  //if some discipleship is editing return nothing
  if( this._parent._discipleshipActive ) return;
  //set some discipleship is editing
  this._parent.startEditDiscipleship();
  //set input for our tittle elemetn
  this._div._tittle.replaceChild( this.getEditTittle() , this._label._tittle );
  //set edit our Summary
  this._div._summary.replaceChild( this.getEditSummary() , this._label._summary );
  //set new button save/cancel
  this._div._segments.appendChild( this.getEditButtons() );
  //add events of inputs errors
  this._parent.setPopUpErrors();
 }











/* Method Discipleship
 * stop edit discipleship
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.stopEditingDiscipleship = function(){
  this._parent.stopEditingDiscipleship();
}









/* Method Discipleship
 * Replace tittle for input tittle
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.getEditTittle = function () {
  //form for input tittle
  this._form._tittle = document.createElement('FORM');
  this._form._tittle.setAttribute('class','ui form');
  this._form._tittle.setAttribute('style','width:100%;');
  this._form._tittle.setAttribute('action','javascript: return false;');
  //div for handle input tittle
  this._div._inputTittle = document.createElement('DIV');
  this._div._inputTittle.setAttribute('class','field');
  //label for input summary
  this._label._inputTittle = document.createElement('LABEL');
  this._label._inputTittle.appendChild( document.createTextNode( this._parent._text._tittle ) );
  //text area for input summary
  this._input._tittle = document.createElement('INPUT');
  this._input._tittle.setAttribute('type','text');
  this._input._tittle.setAttribute('name','input-tittle');
  this._input._tittle.setAttribute('value', this.getTittle() );
  this._input._tittle.setAttribute('placeholder', this._parent._text._placeHolderTittle );
  //add label and iput to my div input summary
  this._div._inputTittle.appendChild( this._label._inputTittle );
  this._div._inputTittle.appendChild( this._input._tittle );
  //add main div to form summary
  this._form._tittle.appendChild( this._div._inputTittle );
  return this._form._tittle;
}











/* Method Discipleship
 * Replace summary for input tittle
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

 Discipleship.prototype.getEditSummary = function () {
   //form for input summary
   this._form._summary = document.createElement('FORM');
   this._form._summary.setAttribute('class','ui form');
   this._form._summary.setAttribute('style','width:100%;');
   this._form._summary.setAttribute('action','javascript: return false;');
   //div for handle input summary
   this._div._inputSummary = document.createElement('DIV');
   this._div._inputSummary.setAttribute('class','field');
   //label for input summary
   this._label._inputSummary = document.createElement('LABEL');
   this._label._inputSummary.appendChild( document.createTextNode( this._parent._text._summary ) );
   //text area for input summary
   this._input._summary = document.createElement('TEXTAREA');
   this._input._summary.setAttribute('name','input-summary');
   this._input._summary.setAttribute('rows','2');
   this._input._summary.setAttribute('style','margin-top: 0px; margin-bottom: 0px; height: 58px;');
   this._input._summary.setAttribute('placeholder', this._parent._text._placeHolderSummary );
   this._input._summary.value = this.getSummary();
   //add label and iput to my div input summary
   this._div._inputSummary.appendChild( this._label._inputSummary );
   this._div._inputSummary.appendChild( this._input._summary );
   //add main div to form summary
   this._form._summary.appendChild( this._div._inputSummary );
   return this._form._summary;
}





/* Method Discipleship
 * Replace button
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.getEditButtons = function () {
   //main div for buttons
   this._div._buttons = document.createElement('DIV');
   this._div._buttons.setAttribute('class','ui segment');
   //div for centered buttons
   this._div._handleButton = document.createElement('DIV');
   this._div._handleButton.setAttribute('class','ui two column centered grid');
   this._div._handleButton.setAttribute('style','padding: 15px;');
   //create button save
   this._button._save = document.createElement('BUTTON');
   this._button._save.setAttribute('class','ui primary button');
   this._button._save.appendChild( document.createTextNode( this._parent._text._save ) );
   this._button._save.addEventListener('click', this.saveDiscipleship.bind(this) );
   //create delete button
   this._button._delete = document.createElement('BUTTON');
   this._button._delete.setAttribute('class','ui secondary button');
   this._button._delete.appendChild( document.createTextNode( this._parent._text._delete ) );
   this._button._delete.addEventListener('click', this.deleteDiscipleship.bind(this) );
   //create button cancel
   this._button._cancel = document.createElement('BUTTON');
   this._button._cancel.setAttribute('class','ui button');
   this._button._cancel.appendChild( document.createTextNode( this._parent._text._cancel ) );
   this._button._cancel.addEventListener('click', this.cancelDiscipleship.bind(this) );
   //remove edit button
   this._div._buttonsEdit.remove();
   //add new buttons
   this._div._handleButton.appendChild( this._button._save );
   this._div._handleButton.appendChild( this._button._delete );
   this._div._handleButton.appendChild( this._button._cancel );
   //addto main div
   this._div._buttons.appendChild( this._div._handleButton );
   return this._div._buttons;
}









/* Method Discipleship
 * cancel discipleship
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.cancelDiscipleship = function () {
  if( this.checkInputs() ){
    if( confirm( this._parent._text._confirmCancel ) ){
      this.updateSegment();
      this.removeErrorMessage();
    }
  }
}






/* Method Discipleship
 * save discipleship
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.saveDiscipleship = function () {
  if( this.checkInputs() ){
    this.removeErrorMessage();
    this.saveData();
    this.updateSegment();
  }
}









 /* Method Discipleship
  * stop edit discipleship
  * @author Juan Acuña - Beru
  * @update 23/03/2015
  */

 Discipleship.prototype.getErrorMessage = function(){
   /*this._div._errorMessage = document.createElement('DIV');
   this._div._errorMessage.setAttribute('class','ui error message');
   this._div._errorMessage.appendChild( document.createTextNode( this._parent._text._empty ) );*/
   this._div._errorMessage = document.createElement('DIV');
   this._div._errorMessage.setAttribute('class','ui pointing red basic label');
   this._div._errorMessage.appendChild( document.createTextNode(this._parent._text._empty) );
   return this._div._errorMessage;
 }









 /* Method Discipleship
  * remove error message
  * @author Juan Acuña - Beru
  * @update 23/03/2015
  */

 Discipleship.prototype.removeErrorMessage = function(){
   if( this._div._errorMessage ){
     this._div._errorMessage.remove();
     this._div._errorMessage = null;
   }
 }












/* Method Discipleship
 * check  inputs fields
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.checkInputs = function () {
  var ok = true;
  for( i in this._input ){
    if( this._input.hasOwnProperty(i) ){
      if( this._input[i].value.length == 0 ){
        //this._div._inputTittle
        //this._input[i].parentNode.setAttribute('class','field error');
        //this._input[i].parentNode.appendChild( this.getErrorMessage() );
        ok = false;
      }
    }
  }
  return ok;
}











/* Method Discipleship
 * update Discipleship
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.updateSegment = function () {
  this.updateTittle();
  this.updateSummary();
  this.removeEditButtons();
  this.stopEditingDiscipleship();
}










/* Method Discipleship
 * update tittle
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.updateTittle = function () {
  this._div._tittle.replaceChild( this.getTitleDiv() , this._form._tittle );
  this._div._tittle.appendChild( this.getEditButton() );
}




/* Method Discipleship
 * update summary
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.updateSummary = function () {
  this._div._summary.replaceChild( this.getSummaryDiv() , this._form._summary );
}




/* Method Discipleship
 * save data from inputs
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.saveData = function () {
  this._data._tittle = this._input._tittle.value;
  this._data._index = this._parent._discipleships.indexOf(this);
  this._data._summary = encodeURIComponent(this._input._summary.value);
}









/* Method Discipleship
 * remove both buttons after editing
 * @author Juan Acuña - Beru
 * @update 23/03/2015
 */

Discipleship.prototype.removeEditButtons = function () {
  this._div._buttons.remove();
}










/* Method Discipleship
 * get Attributes of our class
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

Discipleship.prototype.getTittle = function(){
  return this._data._tittle;
}

Discipleship.prototype.getIndex = function(){
  return this._data._index;
}

Discipleship.prototype.getSummary = function(){
  return decodeURIComponent(this._data._summary);
}





























/* Method Discipleship
 * showDiscipleship
 * @author Juan Acuña - Beru
 * @update 22/03/2015
 */

 Discipleship.prototype.showDiscipleship = function(){
   //console.log(this);
 }
















/* Methods remove elements
 *
 * @author www.stackoverflow.com
 *
 */

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
