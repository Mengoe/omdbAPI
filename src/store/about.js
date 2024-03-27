export default {
    namespaced : true,
    // data의 불변성을 유지해주어야 하기 때문에, 함수를 선언해서 리턴
    // 하나의 객체 데이터를 반환할 때는, return keyword 및 중괄호 생략 가능
    state : () => ({
        name : 'Mengou',
        email : 'gjsehdrh@gmail.com',
        blog : 'https://github.com/Mengoe',
        phone : '+82-10-1234-5678',
        image : 'https://raw.githubusercontent.com/Mengoe/omdbAPI/main/static/cat.jpeg'
    })
}