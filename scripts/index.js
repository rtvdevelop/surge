$(document).ready(function () {
    let rating_given = 0;
    let stars_list = null;
    let max_star_rating = 10;
    HTMLSpanElement.prototype.reset = function () {
        this.classList.remove('checked');
    }
    HTMLSpanElement.prototype.highlight = function () {
        this.classList.add('checked');
    }
    function highlightStarsUpto(node) {
        stars_list = document.querySelectorAll('.rating-wrapper .fa.fa-star');
        stars_list.forEach(star => {
            star.reset();
            if (parseInt(star.id) <= parseInt(node.target.id)) {
                star.highlight();
            }
        })
    }
    function resetRating() {
        if (rating_given) {
            highlightStarsUpto({ target: { id: rating_given } });
        } else {
            stars_list.forEach(star => {
                star.reset();
            })
        }
    }
    function populateMaxRating(targetNode) {
        targetNode.parentElement.children[2].children[1].innerHTML = max_star_rating;
    }
    function populateGivenRating(targetNode, value) {
        targetNode.parentElement.children[2].children[0].innerHTML = value;
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
            populateGivenRating(targetNode, rating_given);
            let i = 1;
            while (i <= max_star_rating) {
                const node = getStarNode(i, 'fa fa-star');
                node.addEventListener('click', node => {
                    rating_given = node.target.id;
                    highlightStarsUpto(node);
                    populateGivenRating(targetNode, rating_given);
                })
                node.addEventListener('mouseover', node => {
                    highlightStarsUpto(node);
                    populateGivenRating(targetNode, node.target.id);
                })
                node.addEventListener('mouseout', node => {
                    resetRating();
                    populateGivenRating(targetNode, rating_given);
                })
                add(targetNode, node);
                i++;
            };
        })
    }
    init();


})