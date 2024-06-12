let currentPage = 'https://swapi.dev/api/people/'

window.onload = async () => {
    try {
        await loadCharacters(currentPage)
    } catch (error){
        console.log(error)
        alert('Erro ao carregar personagens')
    }

    const nextBt = document.getElementById('next-bt')
    const backBt = document.getElementById('back-bt')

    nextBt.addEventListener('click', loadNextPage)
    backBt.addEventListener('click', loadPreviousPage)
} 

async function loadCharacters(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch(url)
        const responseJson = await response.json()

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const bgName = document.createElement("div")
            bgName.className = "bg-names"

            const nome = document.createElement("span")
            nome.className = ("name")
            nome.innerText = `${character.name}`

            bgName.appendChild(nome)
            card.appendChild(bgName)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const atributos = document.getElementById("atributos")
                atributos.innerHTML = ""

                const characterImg = document.createElement("div")
                characterImg.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImg.className = "character-img"

                const name = document.createElement("span")
                name.className = "the-character"
                name.innerText = `NOME: ${character.name}`

                const heigth = document.createElement("span")
                heigth.className = "the-character"
                heigth.innerText = `ALTURA: ${character.heigth}`

                const mass = document.createElement("span")
                mass.className = "the-character"
                mass.innerText = `PESO: ${character.mass}`

                const eyeColor = document.createElement("span")
                eyeColor.className = "the-character"
                eyeColor.innerText = `COR DOS OLHOS: ${character.eye_Color}`

                const birthYear = document.createElement("span")
                birthYear.className = "the-character"
                birthYear.innerText = `NASCIMENTO: ${character.birth_year}`

                atributos.appendChild(characterImg)
                atributos.appendChild(name)
                atributos.appendChild(heigth)
                atributos.appendChild(mass)
                atributos.appendChild(eyeColor)
                atributos.appendChild(birthYear)
            }

            mainContent.appendChild(card)
        });

        const nextBt = document.getElementById('next-bt')
        const backBt = document.getElementById('back-bt')

        nextBt.disabled = !responseJson.next
        backBt.disabled = !responseJson.previous

        backBt.style.visibility = responseJson.previous? "visible" : "hidden"
        nextBt.style.visibility = responseJson.next? "visible" : "hidden"

        currentPage = url

    } catch (error) {
        alert('Erro ao carregar personagens')
        console.log(error)
    }
}

async function loadNextPage(){
    try{
        const response = await fetch(currentPage)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error){
        alert("Erro ao carregar a proxima pagina")
        console.log(error)
    }
}

async function loadPreviousPage(){
    try{
        const response = await fetch(currentPage)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error){
        alert("Erro ao carregar a pagina anterior")
        console.log(error)
    }
}

function hideModal(){
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}
