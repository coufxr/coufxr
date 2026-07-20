document.addEventListener("DOMContentLoaded", () => {


    const links = document.querySelectorAll(".toc-link");


    const headings = [];


    links.forEach(link => {


        const url = new URL(
            link.href,
            window.location.href
        );


        const id = url.hash.slice(1);


        const target =
            document.getElementById(id);


        if (target) {

            headings.push({
                element: target,
                link: link
            });

        }


    });


    if (headings.length === 0) {

        console.log("TOC: no headings found");

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {


                entries.forEach(entry => {


                    if (entry.isIntersecting) {


                        links.forEach(link => {

                            link.classList.remove(
                                "active"
                            );

                        });


                        const current =
                            headings.find(
                                item =>
                                    item.element === entry.target
                            );


                        if (current) {

                            current.link.classList.add(
                                "active"
                            );

                        }


                    }


                });


            },
            {

                rootMargin:
                    "-20% 0px -70% 0px"

            }
        );


    headings.forEach(item => {

        observer.observe(
            item.element
        );

    });


});