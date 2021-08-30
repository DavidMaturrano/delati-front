
import {Modal as M} from "./modal.js";
const API_URL = 'https://delati-try.herokuapp.com/delati';

/* ------------------------------------- VARIABLES DOM ----------------------------------------- */
const HTMLResponse = document.querySelector("#table-content");
const ExtraResponse1 = document.getElementById("table-content-execute");
const ExtraResponse2 = document.getElementById("table-content-cluster");
const loading = document.querySelector('.lds-dual-ring')
const result = document.getElementById("result");
const execute = document.getElementById("execute");
const formulario = document.getElementById("form-post");
var dataResponse;
var aditionalResponse;

/* ------------------------------------- MODELO BASE DE DATOS ----------------------------------------- */
let cobweb = {
    acuity: 1,
    cutoff: 0.0028209479177387815,
    debug: false,
    doNotCheckCapabilities: false,
    saveInstanceData: false,
    seed: 42
}



const load = () => {
    loading.classList.add('lds-dual-ring-dispair');
    execute.disabled = false;
}


const modal = document.querySelector('.modal-options')
const body = document.querySelector('body')
const moreOptions = document.getElementById("more");
const form = document.getElementById('form-modal'); 

moreOptions.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    body.classList.add('scroll-disabler')

    let algoritm = document.getElementById("algoritmo");

    switch(algoritm.value){
        case "Cobweb": form.appendChild(M.createModal(cobweb));break;

        case "Canopy": form.appendChild(M.createModal(canopy));break;
    }
})

const saveOptions = document.getElementById("save");

saveOptions.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('hidden');
    body.classList.remove('scroll-disabler')
    
    const formData = new FormData(form)
    cobweb = Object.fromEntries(formData)
    console.log(cobweb)
})

const cancel = document.getElementById("cancel");

cancel.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('hidden');
    body.classList.remove('scroll-disabler')

    while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
})




function nodeInformationModal(){
    console.log("Funciona")
}

const modalInfoNode = document.querySelector('.modal-more-info')
HTMLResponse.addEventListener('click', (e) => {
    if(e.target.nodeName === "BUTTON"){
        modalInfoNode.classList.remove('hidden');
        body.classList.add('scroll-disabler')
        createNodeModalInfo(e.target.id)
    }
})

const nodeInfoContent = document.getElementById('nodeInfoContent');
const childInfoContent = document.getElementById('childInfoContent'); 
const createNodeModalInfo = (nodeName) => {
    const fragment = document.createDocumentFragment();
    let dataInfo = dataResponse;

    dataInfo.pop();
    let acumulatorChildrens = [];

    for (const tempValue of dataInfo) {
        if(tempValue.identifier === nodeName){
            let value = tempValue

            let table =  document.createElement('TABLE')
            let temporalFragment = `<table>
                                        <thead class="border-bottom">
                                            <th>Propiedad</th>
                                            <th>Valor</th>
                                        </thead>
                                    <tbody>`


            for (const key in value) {
                if(key !== "childrens"){
                    temporalFragment += `<tr><td>${key.toUpperCase()}</td>
                    <td>${value[key]}</td></tr>`
                }
                
            }
            temporalFragment += `</tbody>
                                </table>`
                                
            table.innerHTML = temporalFragment
            fragment.appendChild(table)
            nodeInfoContent.appendChild(fragment)
        }

        if(tempValue.parent === nodeName){
            acumulatorChildrens.push(tempValue)
        }
    }
    
    childInfoContent.appendChild(M.createModalTable(acumulatorChildrens))
}

const close = document.querySelector(".close-modal");
close.addEventListener('click', (e) => {
    e.preventDefault();
    modalInfoNode.classList.add('hidden');
    body.classList.remove('scroll-disabler')

    while (nodeInfoContent.firstChild) {
        nodeInfoContent.removeChild(nodeInfoContent.firstChild);
      }
    while (childInfoContent.firstChild) {
        childInfoContent.removeChild(childInfoContent.firstChild);
      }
})

const typeNode = document.getElementById('typeNode')
let flag = false
typeNode.addEventListener('click', () => {
    clear()
    sortTable("type")
})

const numberData = document.getElementById('numberData')
numberData.addEventListener('click', () => {
    clear()
    sortTable("numberDat")
})

const nameNode = document.getElementById('nameNode')
nameNode.addEventListener('click', () => {
    clear()
    sortTable("identifier")
})

function sortTable(criteria) {
    if(flag === false){
        dataResponse.sort((a,b) => {
            if (a[criteria] > b[criteria]) {
                return 1;
            }
            if (a[criteria] < b[criteria]) {
                return -1;
            }
              return 0;
        })
    }else{
        dataResponse.sort((a,b) => {
            if (a[criteria] < b[criteria]) {
                return 1;
            }
            if (a[criteria] > b[criteria]) {
                return -1;
            }
              return 0;
        })
    }
    flag = !flag
    HTMLResponse.appendChild(M.createTable(dataResponse));
}

function clear (){
    while (HTMLResponse.firstChild) {
        HTMLResponse.removeChild(HTMLResponse.firstChild);
      }
}

/* ------------------------------------- API REQUEST FUNCTION ----------------------------------------- */

formulario.addEventListener('submit', (e)=> {

        e.preventDefault();
        var start = Date.now();

        // Limpiar
        clear()
        
        /* Datos */
        const query = document.querySelector("#form-post textarea[name=query]").value;
        const algoritmo = document.getElementById("algoritmo").value;

        /* Estilos */
        loading.classList.remove('lds-dual-ring-dispair');
        result.classList.remove('despair');
        execute.setAttribute('disabled', true)

        /* Objeto a ennviar */
        const data = {
            type: algoritmo.toLowerCase(),
            query: query,
            ...cobweb,
        }

        /* console.log(data) */

        axios({
            method: 'POST',
            url: `${API_URL}/cobweb`,
            data: data
        })
        .then(res => {
            dataResponse = res.data;
            aditionalResponse = dataResponse.pop()
            HTMLResponse.appendChild(M.createTable(dataResponse));
            ExtraResponse1.appendChild(M.createExtraTable(aditionalResponse.type))
            ExtraResponse2.appendChild(M.createExtraTable(aditionalResponse.parent))

            setTimeout(load, 1000);
        })
        .catch(console.log)
    })



   
    


