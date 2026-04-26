const Clients = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <p className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
                        Ils nous font confiance
                    </p>
                    <p className="mt-2 text-gray-500 text-xl">
                        Des milliers d'entreprises de toutes tailles utilisent
                        notre plateforme de paiement
                    </p>
                </div>
                <div className="mt-10">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                        <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                            <img
                                className="h-12"
                                src="/api/placeholder/160/60"
                                alt="Logo client 1"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                            <img
                                className="h-12"
                                src="/api/placeholder/160/60"
                                alt="Logo client 2"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                            <img
                                className="h-12"
                                src="/api/placeholder/160/60"
                                alt="Logo client 3"
                            />
                        </div>
                        <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
                            <img
                                className="h-12"
                                src="/api/placeholder/160/60"
                                alt="Logo client 4"
                            />
                        </div>
                        <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
                            <img
                                className="h-12"
                                src="/api/placeholder/160/60"
                                alt="Logo client 5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clients;
