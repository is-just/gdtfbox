import { useEffect, useState } from "react";
import FixtureItem from "../components/elements/fixtures/fixture-item";
import FixtureManufacturer from "../components/elements/fixtures/fixture-manufacturer";

interface ListViewPorps {
    fixtures: any[]
}

const ListView = (props: ListViewPorps) => {

    const [sortedFixtures, setSortedFixtures] = useState<any>([]);

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
        <div>
            { Object.keys(sortedFixtures).map((key) => {
                return (
                    <div className="border-white p-5 border">
                        <div className="border-white border-b">{ key }</div>
                        <FixtureManufacturer fixtures={sortedFixtures[key]} /> 
                    </div>
                )
            }) }
        </div>
    )
}

export default ListView;