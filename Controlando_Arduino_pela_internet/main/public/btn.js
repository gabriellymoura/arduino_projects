$("button").click(function(){
    const call =io();
    var button = $(this).val();
    console.log(button);
    call.emit('btnAction', {
        value: button.toString()
    })
});