
if(typeof window !== 'undefined'){

    window.onload = () =>{
        const grid = document.querySelector('.grid');
        
        const masonry = new Masonry(grid,{
            itemSelector: '.grid-item',
            gutter:10
        })
        masonry.on('LayoutComplete',()=> console.log("Layout Complete"));
    }
}


