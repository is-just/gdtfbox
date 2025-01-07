import FixtureItem from "./fixture-item";

const FixtureManufacturer = (props: any) => {
    return (
        <div>
            { props.fixtures.map((fixtures: any) => {
                return (
                    <>
                        <FixtureItem fixture={fixtures} />
                    </>
                );
            }) }
        </div>
    )
}

export default FixtureManufacturer;