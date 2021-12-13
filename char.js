
let blockNames = [
    "SENSORY SENSITIVITY",
    "SENSORY OVEREXCITABILITY",
    "INTENSE FOCUS ON INTERESTS",
    "INTELLECTUAL OVEREXCITABILITY",
    "STIMMING",
    "PSYCHOMOTOR OVEREXCITABILITY",
    "SOCIAL INTERACTION IS DRAINING",
    "DIFFICULTY FINDING PEERS",
    "INTERPRETING COMMUNICATION WITH PRECISION",
    "INTERPRETING COMMUNICATION DIFFERENTLY",
    "INTENSE DRIVE TO LEARN INFORMATION",
    "INTENSE DRIVE TO COLLECT DATA",
    "WANTING TO SHARE ENJOYMENT OF INFORMATION",
    "MELTDOWNS",
    "SHUTTING DOWN EMOTIONALLY",
    "EMOTIONAL SENSITIVITY",
    "EMOTIONAL OVEREXCITABILITY",
    "INFODUMPING",
    "FEELING EXCLUDED",
    "FEELING ALIENATED",
    "RELATIONSHIP PROBLEMS",
    "ANXIETY",
    "NERDY",
    "FEELING GOOD ABOUT MY ABILITIES",
    "FEELING BAD ABOUT MY ABILITIES",
    "PERFECTIONISM",
    "NEEDING TO PLAN AHEAD",
    "PREFERRING MY ROUTINE",
    "BEING SPONTANEOUS",
    "QUIRKY SENSE OF HUMOR",
    "I'M LAST TO GET THE JOKE",
    "SNARKY",
    "SINCERE",
    "INTENSE DRIVE TO MASTER A CHALLENGE",
    "ENJOYMENT OF PRACTICING A SKILL",
    "AUTISTIC",
    "ASPERGERS",
    "GIFTEDNESS",
    "PROFOUNDLY GIFTED",
    "NEURODIVERGENT",
    "DISABILITY",
    "TWICE-EXCEPTIONAL",
    "PHYSICALLY AWKWARD",
    "ATHLETICALLY TALENTED",
    "HAVING HIGH STANDARDS",
    "EXTREMELY HONEST",
    "I NEED TO KNOW THE RULES",
    "STRONG SENSE OF JUSTICE"
];

$(document).ready(() => {

    blockNames.sort();

    let enableAction = true;

    let canAct = () => {
        return enableAction;
    };

    let doAct = () => {
        enableAction = false;
        setTimeout(() => { enableAction = true; }, 100);
    };

    let isCarry = false;
    let carryBlock = null;

    let mouseX = 0;
    let mouseY = 0;

    let positionCarryBlock = () => {

        if (isCarry) {

            carryBlock.css({
                left: mouseX,
                top: mouseY
            });

        }

    };

    $(window).mousemove((e) => {

        mouseX = e.pageX;
        mouseY = e.pageY;

        positionCarryBlock();

    });

    let createStaticBlock = (val, pop) => {

        let result = $('<div></div>').addClass('static-block').text(val).click(() => {
            if (!isCarry && canAct()) {
                isCarry = true;
                carryBlock = $('<div></div>').addClass('static-block').addClass('carry').text(val);
                if (pop) {
                    result.remove();
                }
                $('body').append(carryBlock);
                positionCarryBlock();
                doAct();
            }
        });

        return result;

    };

    let setupBucket = (elem) => {
        
        $(elem).click(() => {
            console.log("a");
            if (isCarry && canAct()) {
                isCarry = false;
                $(elem).append(createStaticBlock(carryBlock.text(), true));
                carryBlock.remove();
                doAct();
            }
        });

    };

    let setupBank = (elem) => {

        $(elem).click(() => {
            console.log("a");
            if (isCarry && canAct()) {
                isCarry = false;
                carryBlock.remove();
                doAct();
            }
        });

    };

    setupBank('#L');
    setupBucket('#red-bucket');
    setupBucket('#green-bucket');
    setupBucket('#blue-bucket');

    for (let x of blockNames) {

        $('#L').append(createStaticBlock(x, false));

    }

    let onResize = () => {

        let w = $('#R').width();

        let h = $('#R').height();

        let sw = 800;

        let sh = 600;

        let r = Math.min(w / sw, h / sh);

        $('#board-container').width(sw * r);

        $('#board-container').height(sh * r);

    };

    onResize();

    $(window).resize(onResize);

    $('#add-input').keyup((e) => {

        if (e.keyCode == 13 && $('#add-input').val().length > 0) {

            createStaticBlock($('#add-input').val(), false).insertAfter($('#add-input'));

            //$('#L').prepend();

            $('#add-input').val('');

        }

    });

});