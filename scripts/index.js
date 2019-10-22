$(document).ready(function () {
    let rating_given_slide1 = 0;
    let rating_given_slide2 = 0;
    let max_star_rating = 10;
    HTMLSpanElement.prototype.reset = function () {
        this.classList.remove('checked');
    }
    HTMLSpanElement.prototype.highlight = function () {
        this.classList.add('checked');
    }
    function highlightStarsUpto(node) {
        node.parentNode.childNodes.forEach(star => {
            star.reset();
            if (parseInt(star.id) <= parseInt(node.id)) {
                star.highlight();
            }
        })
    }
    function resetRating(node) {
        const context_is_slide1 = node.target.parentElement.classList.contains('slide1');
        const context_is_slide2 = node.target.parentElement.classList.contains('slide2');
        if (rating_given_slide1 > 0 && context_is_slide1) {
            const currNode = document.querySelector('.slide-1 .rating-wrapper').children[rating_given_slide1 - 1];
            highlightStarsUpto(currNode);
            return;
        }
        if (rating_given_slide2 > 0 && context_is_slide2) {
            const currNode = document.querySelector('.slide-2 .rating-wrapper').children[rating_given_slide2 - 1];
            highlightStarsUpto(currNode);
            return;

        }
        node.target.parentNode.childNodes.forEach(star => {
            star.reset();
        })

    }
    function populateMaxRating(targetNode) {
        targetNode.parentElement.children[2].children[1].innerHTML = max_star_rating;
    }
    function populateGivenRating(targetNode, value) {
        targetNode.parentElement.children[2].children[0].innerHTML = value;
    }

    function getRatingWrapperContext(node) {
        if (node.target.parentNode.classList.contains('slide1')) {
            return 1;
        } else {
            return 2;
        }

    }
    function init() {
        const targetList = document.querySelectorAll('.rating-wrapper');
        function getStarNode(id_name, class_name) {
            const star_elm = document.createElement('span');
            star_elm.id = id_name;
            star_elm.className = class_name;
            return star_elm;
        }
        function add(target, elm) {
            target.append(elm);
        }
        targetList.forEach(targetNode => {
            populateMaxRating(targetNode);
            populateGivenRating(targetNode, 0);
            let i = 1;
            while (i <= max_star_rating) {
                const node = getStarNode(i, 'fa fa-star');
                node.addEventListener('click', node => {
                    let context = getRatingWrapperContext(node);
                    if (context === 1) {
                        rating_given_slide1 = parseInt(node.target.id);
                    } else {
                        rating_given_slide2 = parseInt(node.target.id);
                    }
                    highlightStarsUpto(node.target);
                    populateGivenRating(targetNode, node.target.id);
                })
                node.addEventListener('mouseover', node => {
                    highlightStarsUpto(node.target);
                })
                node.addEventListener('mouseout', node => {
                    resetRating(node);
                })
                add(targetNode, node);
                i++;
            };
        })
    }
    init();
})