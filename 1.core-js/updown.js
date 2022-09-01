
//필요한 데이터 : 랜덤 숫자, 횟수카운트, 카운트다운, 최소값, 최대값

//최대범위를 저장할 변수
const MAX = 100;

//게임에 필요한 데이터 객체
const gameData = {
    secret_num : Math.floor(Math.random()*MAX)+1 ,      // 1<=  <100
    count : 0,
    countdown : 6,
    min : 1,
    max : MAX
};

// - - - - - - 함수 정의부 - - - - - -

//사용자의 입력을 수행하는 함수
function inputNumber() {
    //객체에서 min과 max의 값을 뽑아서 메세지를 완성시켜줄거다.
    //const min = gameData.min;
    //const max = gameData.max;     //이렇게 가져와도 되지만

    //객체 디스트럭쳐링(ES6) : 데이터 참조시에만 사용 가능
    //수정, 추가시에는 사용 불가.
    const {min, max} = gameData;        //const min과 max는 gameData에서 가져온다.
    
    //사용자의 입력값을 객체에 추가
    gameData.answer = +prompt(`숫자를 입력하세요! [${min} ~ ${max}]`);

    gameData.count++;
    gameData.countdown--;

    return checkNumber();   //정답과 비교하는 다른 함수
}

//사용자의 입력값을 검증하는 함수
function checkNumber() {
    const {secret_num, count, answer, countdown} = gameData;

    if (secret_num === answer) {
        alert ('정답입니다!! ' + count + '번 만에 맞추셨군요.');
        checkCountDown(countdown);  //승패여부 말해주는 함수
        return true;
    } else if (secret_num > answer) {
        alert ('UP !');
        gameData.min = answer+1;
    } else {
        alert ('DOWN !');
        gameData.max = answer-1;
    }
    alertCountDown(countdown);  //남은횟수 알려주는 함수

    return false;
}

//남은 횟수 알려주는 함수
function alertCountDown(countdown) {
    if (countdown > 0) {
        alert ('정답 기회는 ' + countdown + '번 남았습니다.');
    } else {
        alert ('정답 기회가 모두 소진되었습니다. 문제를 계속 풀어주세요.');
    }
}

//사용자의 카운트다운을 체크하여 승패여부 말해주는 함수
function checkCountDown(countdown) {
    if (countdown > 0) {
        alert ('You Win!');
    } else {
        alert ('You Lose.');
    }
}

// 핵심 실행부 (main의 역할을 하는 함수)
// 즉시실행함수로 선언하여 따로 호출하지 않아도 바로 실행될 수 있도록 작성
(function() {
    alert('[UP & DOWN 게임 - 1 ~ 100 사이의 숫자를 맞춰보세요!]');

    while(!inputNumber()) {  //flase가 리턴되면 게임 계속 진행, true가 오면 반복문 종료

    }
}());
