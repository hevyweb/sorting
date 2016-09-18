$('body').ready(function(){
    inprogress = false;
    $('button').click(function(e){
        $(this).unbind('click');
        compareElements();
        bubbling = setInterval(function(){
            if (!inprogress){
                clearInterval(bubbling);
                alert('Done!');
                return;
            }
            inprogress = false;
            compareElements();
        }, $('input').length*1000);
    });
});

$.fn.blink = function(){
    var currentElement = $(this).css('border-color', 'red');
    currentElement.animate({
        'border-color': 'red'
    }, 450, 'linear', function(){
        currentElement.animate({
            'border-color': 'silver'
        }, 450, 'linear', function(){
            $(this).removeAttr('style');
        });
    });
};

$.fn.swing = function(object){
    buildPrototype(this.css('opacity', 0)).moveTo(object);
    buildPrototype(object.css('opacity', 0)).moveTo(this);
    
}

$.fn.moveTo = function(target){
    var targetPlace = $(target).offset();
    var currenPlace = $(this).offset();
    var direction = 1;
    if (currenPlace.left < targetPlace.left) {
        direction = -1;
    }
    
    $(this).animate({
        'top': targetPlace.top + $(target).height()*1.5*direction,
        'left': currenPlace.left + parseInt((targetPlace.left-currenPlace.left)/2)
    }, 450, 'swing', function(){
        $(this).animate({
            'top': targetPlace.top,
            'left': targetPlace.left
        }, 450, 'swing', function(){
            $(target).val($(this).html()).removeAttr('style');
            $(this).remove();
        })
    });
    
}

function buildPrototype(object)
{
    var offset = $(object).offset();
    return $('<div />').html($(object).val()).css({
        'top'           : offset.top,
        'left'          : offset.left,
        'border-color'  : 'green'
    }).appendTo($('body'));
}


function compareElements()
{
    $('input').each(function(i){
        var current = $(this);
        setTimeout(function(){
            var next = current.next('input');
            if (next.length){
                current.css('border-color', 'red');
                next.css('border-color', 'red');
                if (current.val() > next.val()){
                    inprogress = true;
                    current.swing(next);
                } else {
                    current.blink();
                    next.blink();
                }
            }
        }, i*1000);
        return;
    });
}
