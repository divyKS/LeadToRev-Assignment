import axios from 'axios';
import { ChevronDown, ChevronUp, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const SearchCountry = ({ setCurrentCountry }) => {
    const [countries, setCountries] = useState([{}])
    const [searchQuery, setSearchQuery] = useState('')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca3");
            const countryOptions = response.data.map((country) => ({
              label: country.name.common,
              value: country.cca3,
            }));
            setCountries(countryOptions);
            // console.log(countryOptions);
          } catch (error) {
            console.error("Error fetching country data:", error);
          }
        };
    
        fetchCountries();
    }, []);
    
    return (
        <>
            <div className="relative">
                
                <div className="relative w-[500px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search country"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                     <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-blue-500 transition-colors"
                    >
                        {isDropdownOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-400 hover:text-blue-500" />
                        ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 hover:text-blue-500" />
                        )}
                    </button>
                </div>

                {isDropdownOpen && countries && (
                    <ul className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                        {
                            countries.filter((country) =>
                                country.label.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((country) => (
                                <li
                                key={country.value}
                                onClick={() => setCurrentCountry(country.value)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                >
                                    {country.label}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default SearchCountry