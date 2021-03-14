
if(typeof window !== 'undefined'){

    window.onload = () =>{
        const grid = document.querySelector('.grid');
        
        const masonry = new Masonry(grid,{
            itemSelector: '.grid-item',
            gutter:10
        })
        masonry.on('LayoutComplete',()=> console.log("Layout Complete"));
        $('.page1').on('click',clickedPageOne);
        $('.page2').on('click',clickedPageTwo);
        $('#selection').on('click',handleSelection);
    }
}
let  currentPage = 1;
function clickedPageOne(){
    currentPage = currentPage === 2 ? 1 : 1;
    console.log(`Currently on page ${currentPage}`);
}
function clickedPageTwo(){
    currentPage = currentPage === 1 ? 2 : 2;
    console.log(`Currently on page ${currentPage}`);
}

function handleSelection(){
    console.log('Clicked on me');
}

const getPageNumber = () => {
    console.log(`Currently on page ${currentPage} from the app`);
    return currentPage;
}

exports.getPageNumber = getPageNumber;