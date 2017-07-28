//-----------------------
// Makes a standard html form into a ajax request
//----------------------
var ajaxForm = function (formId) {

    //-----------------------
    // get data from form
    //-----------------------
    var _getData = function (e) {
        var data = [];
        $(e.srcElement).find(':input').each(function (i, x) {
            var element = $(x);
            data[element.attr("id")] = element.val();
        })
        return data;
    }

    //-----------------------
    // get action from form
    //-----------------------
    var _getFormAction = function (e) {
        var frm = $(e.srcElement);
        return {
            method: frm.attr("method"),
            action: frm.attr("action")
        }
    }

    //-----------------------
    // on submit
    //-----------------------
    var _onSumbit = function (e) {
        e.preventDefault();
        var data = _getData(e);
        var formAction = _getFormAction(e);
        _onFormStart(data, formAction);
        $.ajax({
            type: formAction.method,
            url: formAction.action,
            data: data,
            success: function (r) {
                _onFormEnd({data: data, formAction: formAction, errored: false, response: r});
            },
            error: function (r) {
                _onFormEnd({ data: data, formAction: formAction, errored: true, response: r });
            }
        });
    }

    //-----------------------
    // on submit start 
    //-----------------------
    var _onFormStartHandler = null;
    var _onFormStart = function (d) {
        if (_onFormStartHandler != null) {
            _onFormStartHandler(d)
        }
    }

    //-----------------------
    // on response 
    //-----------------------
    var _onFormEndHandler = null;
    var _onFormEnd = function (d) {
        if (_onFormEndHandler != null) {
            _onFormEndHandler(d);
        }
    }

    //-----------------------
    // init
    //-----------------------
    $("#" + formId).submit(_onSumbit);
    

    return {
        onFormStart: function (e) { _onFormStartHandler = e; },
        onFormEnd: function (e) { _onFormEndHandler = e; }
    }

}