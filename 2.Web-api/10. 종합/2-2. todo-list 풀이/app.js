//일정 데이터가 들어 있는 배열 선언
const todos = [
    {
        id: 1,
        text: '할 일 1',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },
    {
        id: 2,
        text: '할 일 2',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },
    {
        id: 3,
        text: '할 일 3',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },

];

// [1] 1-1. 추가될 할 일 객체의 id를 생성해주는 함수 정의.
function makeNewId() {
    if (todos.length>0) {
        return todos[todos.length-1].id+1;
    } else {
        return 1;
    }
}

//[1] 2-1. 화면에 표현할 .todo-list-item 노드를 생성하는 함수 정의
function makeNewToDoNode(newTodo) {
    const $li = document.createElement('li');
    const $label = document.createElement('label');
    const $divMod = document.createElement('div');
    const $divRem = document.createElement('div');

    //label 태그 작업
    $label.classList.add('checkbox');
    const $check = document.createElement('input');
    $check.setAttribute('type', 'checkbox');
    const $span = document.createElement('span');
    $span.classList.add('text');
    $span.textContent = newTodo.text;
    $label.appendChild($check);
    $label.appendChild($span);

    //label 태그작업 innerHTML버전
    //$label.innerHTML = `<input type="checkbox">
    //<span class ="text">${newTodo.text}</span>`;

    //수정 div태그 작업
    $divMod.classList.add('modify');
    const $modIcon = document.createElement('span');
    $modIcon.classList.add('lnr','lnr-undo');       //클래스 2개 추가하기 - '',''
    $divMod.appendChild($modIcon);

    //삭제 div태그 작업
    $divRem.classList.add('remove');
    const $remIcon = document.createElement('span');
    $remIcon.classList.add('lnr', 'lnr-cross-circle');
    $divRem.appendChild($remIcon);
    
    //li 태그 작업
    $li.dataset.id = newTodo.id;
    $li.classList.add('todo-list-item');

    for(let $ele of [$label, $divMod, $divRem]) {
        $li.appendChild($ele);
    }

    //ul태그를 지목해서 $li를 자식노드로 추가
    document.querySelector('.todo-list').appendChild($li);
    
}

//[1] 할일 추가 처리 함수 정의
function insertToDoData() {
    console.log('할일추가함수 호출');
    const $todoText = document.getElementById('todo-text');

    //비어있는지 검증(입력값이 없다면 추가처리하지 않을거다.)
    //공백이 들어갈 가능성이 있기 때문에 공백 제거하고 비교.
    if ($todoText.value.trim() === '') {    //trim() : 앞뒤공백 제거
        $todoText.style.background = 'lightcoral';
        $todoText.setAttribute('placeholder', '필수입력사항입니다.');
        $todoText.value = '';
        return;
    } else {
        //제대로 입력이 되었다면 속성과 디자인을 초기화.
        $todoText.setAttribute('placeholder', '할 일을 입력하세요.');
        $todoText.style.background = '';
    }

    //1. todos 배열에 객체를 생성한 후 추가
    const newTodo = {
        id : makeNewId(),
        text : $todoText.value,
        done : false
    };
    todos.push(newTodo);


    //2. 추가된 데이터를 화면에 표현 (li태그를 추가)
    makeNewToDoNode(newTodo);

    //3. 입력완료 후 input에 존재하는 문자열을 제거
    $todoText.value = '';

}

//[2]-2, [3]-3. data-id값으로 배열을 탐색하여 일치하는 객체가 들어있는 인덱스 반환
function findIndexByDataId(dataId) {
    for (let i=0; i<todos.length; i++) {
        if (dataId === todos[i].id) {
            return i;
        }
    }
}


// [2] 할일 완료처리 수행 함수 정의
function changeCheckState($label) {

    //1. 할일이 완료된 노드의 클래스 이름('checked')을 추가(디자인주려고)
    //checked를 상황에 따라서 추가하거나 삭제할 수 있어야 하기 때문에 toggle 함수로 처리해주도록 하겠습니다.
    $label.classList.toggle('checked');

    //2. dataId를 기반으로 배열을 탐색하여 data-id와 일치하는 id 프로퍼티를 가진 객체의 인덱스를 얻어올 예정
    const dataId = +$label.parentNode.dataset.id; //크기비교해야해서 앞에 +
    const index = findIndexByDataId(dataId);    //태그의 dataId가 몇번객체에 존재하는지 찾아주기(반복문으로)

    //3. 찾은 인덱스로 처리(true는 false로, false는 true로)
    todos[index].done = !todos[index].done;
    console.log(todos);
}


// [3] 할 일 삭제 처리함수 정의
function removeToDoData($delTarget) {

    //1. 애니메이션 적용을 위해 클래스 이름 추가
    $delTarget.classList.add('delMoving');
    
    //2. removeChild 진행 전에 애니메이션 발동 및 배열 내부 객체 삭제가 진행될 수 있도록 시간을 지연. 
    //애니메이션(1.5초) 지나고 요소 지워지게하기
    setTimeout(() => {
        document.querySelector('.todo-list').removeChild($delTarget);
    }, 1500);

    //3. 배열 내에 있는 객체도 삭제를 진행
    const index = findIndexByDataId(+$delTarget.dataset.id);
    todos.splice(index, 1); //index 부터 1개 지워라.

    console.log(todos);
}


// [4] 수정 모드 진입 이벤트 함수
function enterModifyMode($modSpan) {

    //1. 수정모드 진입 버튼을 교체 (lnr-undo -> lnr-checkmark-circle)
    $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

    //2. span.text를 input태그로 교체 (삭제하고 추가)
    const $label = $modSpan.parentNode.previousElementSibling;
    const $textSpan = $label.lastElementChild;

    const $modInput = document.createElement('input');
    $modInput.setAttribute('type', 'text');
    $modInput.classList.add('mod-input');
    $modInput.setAttribute('value', $textSpan.textContent);

    $label.replaceChild($modInput, $textSpan);
}

// [5] 수정 완료 이벤트 처리 함수
function modifyToDoData($modCompleteSpan) {
    
    //1. 버튼을 원래대로 돌리기.
    $modCompleteSpan.classList.replace('lnr-checkmark-circle', 'lnr-undo');

    //2. input을 다시 span.text로 변경
    const $label = $modCompleteSpan.parentNode.previousElementSibling;
    const $modInput = $label.lastElementChild;

    const $textSpan = document.createElement('span');
    $textSpan.textContent = $modInput.value;
    $textSpan.classList.add('text');

    $label.replaceChild($textSpan, $modInput);

    //3. textSpan에 새 값
    const idx = findIndexByDataId(+$label.parentNode.dataset.id);
    todos[idx].text = $textSpan.textContent;

    console.log(todos);
}

//메인 역할을 하는 즉시 실행 함수
(function() {

    //할 일 추가 이벤트
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', e => {

        //form태그 안의 button은 type을 명시하지 않으면 자동submit이 실행됩니다.
        e.preventDefault(); //버튼의 고유기능인 submit을 중지. (버튼태그에 type=button이라고 제대로 주던가.)

        insertToDoData();
    })

    //할 일 완료(체크박스) 이벤트
    const $todoList = document.querySelector('ul.todo-list');
    $todoList.addEventListener('change', e => {
        if(!e.target.matches('input[type=checkbox]')) { //체크박스 부분에 이벤트발생한게아니면 종료
            return;
        }
        changeCheckState(e.target.parentNode);  //label을 함수의 매개값으로 전달.
    });

    //할 일 삭제 이벤트
    $todoList.addEventListener('click', e => {
        if (!e.target.matches('.todo-list .remove span')) {
            return;
        }
        removeToDoData(e.target.parentNode.parentNode);
    });

    //할 일 수정 이벤트 (수정 모드 진입, 수정 완료)
    $todoList.addEventListener('click', e => {
        if(e.target.matches('.todo-list .modify span.lnr-undo')) {
            //수정모드 진입
            enterModifyMode(e.target);

        } else if(e.target.matches('.todo-list .modify span.lnr-checkmark-circle')) {
            //수정모드에서 수정 확정지으려는 이벤트
            modifyToDoData(e.target);

        } else {
            return;
        }
    })

}());








