import { useEffect, useState } from "react";
import FixtureItem from "../components/elements/fixtures/fixture-item";
import FixtureManufacturer from "../components/elements/fixtures/fixture-manufacturer";

interface ListViewPorps {
    fixtures: any[]
}

const ListView = (props: ListViewPorps) => {

    const [sortedFixtures, setSortedFixtures] = useState<any>([]);
    const [openManu, setOpenManu] = useState<string | null>();

    useEffect(() => {

        console.log("new");

        // Sort Fixtures by manufacturer 
        const sorted: any = [];

        props.fixtures.forEach((fixture) => {
            if(!sorted[fixture.manufacturer]) {
                sorted[fixture.manufacturer] = [];
            }

            sorted[fixture.manufacturer] = [...sorted[fixture.manufacturer], fixture];
        });

        
        setSortedFixtures(sorted);
    }, [props.fixtures])

    return (
        <div className="p-5">
            { Object.keys(sortedFixtures).map((key) => {
                return (
                    <div className="border-white border border-b-0 border-t-0 first:border-t-1" key={key}>
                        <div className="border-white px-5 py-2 uppercase border-b" onClick={() => openManu === key ? setOpenManu(null) : setOpenManu(key)}>
                            { key } - { sortedFixtures[key].length }
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