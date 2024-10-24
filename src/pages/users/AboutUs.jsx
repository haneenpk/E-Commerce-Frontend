import React from 'react';

// About Component
const About = () => {
    return (
        <div>
            {/* Title Section */}
            <section
                className="bg-img1 text-center px-4 py-20 -mt-5"
                style={{ backgroundImage: `url(${import.meta.env.VITE_AXIOS_BASE_URL}/images/bg-01.jpg)` }}
            >
                <h2 className="text-4xl text-white">About</h2>
            </section>

            {/* Content Section */}
            <section className="bg-gray-100 py-20 px-10">
                <div className="container mx-auto">
                    <div className="flex flex-wrap ">
                        {/* Text Content */}
                        <div className="w-full md:w-7/12 lg:w-8/12">
                            <div className="pt-7 pr-10 md:pr-0">
                                <h3 className="text-3xl font-semibold text-gray-800 pb-4">Welcome to E-Commerce</h3>

                                <p className="text-gray-600 pb-6">
                                    Welcome to E-Commerce, your premier destination for a seamless and satisfying online shopping
                                    experience. At E-Commerce, we pride ourselves on offering a curated selection of high-quality
                                    products that cater to your diverse needs and preferences. Whether you're searching for the latest
                                    fashion trends, cutting-edge electronics, or home essentials, we've got you covered. Our
                                    user-friendly interface ensures a hassle-free browsing experience, and our secure checkout process
                                    guarantees a safe and reliable transaction every time. Committed to customer satisfaction, we strive
                                    to exceed your expectations by providing exceptional customer service and swift delivery. E-Commerce
                                    isn't just a website; it's your go-to destination for a world of convenience and style. Join us in
                                    exploring the endless possibilities of online shopping, where quality meets convenience at Coza
                                    Store.
                                </p>

                                <p className="text-gray-600 pb-6">
                                    Discover a world of endless possibilities at E-Commerce, where innovation and convenience converge to
                                    redefine your online shopping experience. Our commitment to excellence is reflected in the
                                    meticulously curated selection of products that cater to your lifestyle needs. From fashion-forward
                                    apparel to cutting-edge electronics and essential home goods, E-Commerce is your one-stop destination
                                    for quality and style. Navigating our intuitive platform is a breeze, ensuring you find exactly what
                                    you're looking for with ease. Embrace the future of online shopping with our secure checkout process,
                                    guaranteeing a safe and reliable transaction every time. At E-Commerce, customer satisfaction is our
                                    priority, and we go the extra mile to provide exceptional service and prompt deliveries. Join us on a
                                    journey where convenience meets sophistication, and let E-Commerce elevate your online shopping
                                    experience to new heights.
                                </p>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="w-11/12 md:w-5/12 lg:w-4/12 mx-auto mt-10 md:mt-0">
                            <div className="border overflow-hidden">
                                <img src={`${import.meta.env.VITE_AXIOS_BASE_URL}/images/about-01.jpg`} alt="E-Commerce" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
