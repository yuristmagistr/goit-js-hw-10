// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


form.addEventListener('submit', createPromises);

function createPromises(event) {
    event.preventDefault();

    const delay = event.target.elements.delay.value;
    const succesValue = event.target.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (succesValue === 'fulfilled') {
                resolve(`✅  Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`)
            }
        }, delay)
    });

    
    
    const onResolve = (value) => {
        console.log(value);
    iziToast.success({
        message: value,
        position: "topRight",
        messageColor: '#fff',
    })
    }
    
    const onReject = (error) => {
        console.log(error);
    iziToast.error({
        message: error,
        position: "topRight",
        messageColor: '#fff',
});
    }
    promise.then(onResolve).catch(onReject);
};
