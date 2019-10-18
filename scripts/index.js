$(document).ready(function () {
    $('.carousel').carousel('pause');
    let rating_given = 0;
    let stars_list = null;
    let max_star_rating = 10;
    const target = document.querySelector('.rating-wrapper');
    HTMLSpanElement.prototype.reset = function () {
        this.classList.remove('checked');
    }
    HTMLSpanElement.prototype.highlight = function () {
        this.classList.add('checked');
    }
    function getStarNode(id_name, class_name) {
        const star_elm = document.createElement('span');
        star_elm.id = id_name;
        star_elm.className = class_name;
        return star_elm;
    }
    function add(target, elm) {
        target.append(elm);
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
    function populateMaxRating() {
        document.querySelector('#max-value').innerHTML = max_star_rating;
    }
    function populateGivenRating(value) {
        document.querySelector('#rated-value').innerHTML = value;
    }
    function init() {
        populateMaxRating();
        populateGivenRating(rating_given);
        let i = 1;
        while (i <= max_star_rating) {
            const node = getStarNode(i, 'fa fa-star');
            node.addEventListener('click', node => {
                rating_given = node.target.id;
                highlightStarsUpto(node);
                populateGivenRating(rating_given);
            })
            node.addEventListener('mouseover', node => {
                highlightStarsUpto(node);
                populateGivenRating(node.target.id);
            })
            node.addEventListener('mouseout', node => {
                resetRating();
                populateGivenRating(rating_given);
            })
            add(target, node);
            i++;
        };
    }
    init();
})