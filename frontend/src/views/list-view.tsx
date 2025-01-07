import { useEffect, useState } from "react";
import FixtureItem from "../components/elements/fixtures/fixture-item";
import FixtureManufacturer from "../components/elements/fixtures/fixture-manufacturer";

interface ListViewPorps {
    fixtures: any[]
}

const ListView = (props: ListViewPorps) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFixtures, setFilteredFixtures] = useState<any>([]);
    const [sortedFixtures, setSortedFixtures] = useState<any>([]);
    const [openManu, setOpenManu] = useState<string | null>();

    useEffect(() => {
        
        const filtered = [...props.fixtures];

        if(searchTerm === '') {
            setFilteredFixtures(filtered);
            return
        }

        const result = filtered.filter((f) => {
            if(f.fixture.toLowerCase().includes(searchTerm.toLowerCase()) || f.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true
            }

            return false
        });

        setFilteredFixtures(result);

        console.log("filter", searchTerm, props.fixtures.length, result.length);
        console.log(result)
    }, [props.fixtures, searchTerm])

    useEffect(() => {
        // Sort Fixtures by manufacturer 
        let sorted: any = [];

        filteredFixtures.forEach((fixture: any) => {
            if(!sorted[fixture.manufacturer.trim()]) {
                sorted[fixture.manufacturer.trim()] = [];
            }

            sorted[fixture.manufacturer.trim()] = [...sorted[fixture.manufacturer.trim()], fixture];
        });

        // sort manufacturer
        const saveSort = sorted;
        let sortedKeys = Object.keys(sorted).sort();


        sorted = []

        sortedKeys = sortedKeys.sort();

        sortedKeys.forEach((key: any) => {
            const s = saveSort[key].sort((a: any, b: any) => {
                const nameA = a.fixture.toUpperCase(); // ignore upper and lowercase
                const nameB = b.fixture.toUpperCase();

                if (nameA < nameB) {
                    return -1;
                }
                
                if (nameA > nameB) {
                    return 1;
                }
                
                    // names must be equal
                return 0;
            });

            sorted[key] = [...s];
        });

        setSortedFixtures(sorted);
    }, [filteredFixtures])

    return (
        <div className="p-5">

            <div>
                <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            { Object.keys(sortedFixtures).map((key) => {
                return (
                    <div className="border-white border border-b-0 border-t-0 first:border-t-1" key={key}>
                        <div className="border-white px-5 py-2 uppercase border-b" onClick={() => openManu === key ? setOpenManu(null) : setOpenManu(key)}>
                            { key } - { sortedFixtures[key]?.length ?? 0 }
                        </div>
                        <div className={openManu === key ? '' : 'hidden'}>
                            <FixtureManufacturer key={key} fixtures={sortedFixtures[key]} /> 
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}

export default ListView;