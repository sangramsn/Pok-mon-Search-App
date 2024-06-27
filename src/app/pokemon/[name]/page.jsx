//"use client";

//import { getPokemon } from "@/app/services/pokemonApi";
//import Link from "next/link";
//import { useRouter, useSearchParams } from "next/navigation";
//import { usePathname } from "next/navigation";
//import { useEffect, useState } from "react";

//const PokemonCard = ({ params }) => {
//    const [pokemon, setPokemon] = useState();

//    useEffect(() => {
//        const fetchPokemon = async () => {
//            try {
//                const data = await getPokemon(params.name);
//                setPokemon(data);
//            } catch (error) {
//                console.error("Failed to fetch Pokemon:", error);
//            }
//        };

//        fetchPokemon();
//    }, []);



//    const types = pokemon?.types.map((p) => {
//        return p.type?.name
//    })

//    const stats = pokemon?.stats.map((p) => {
//        return p?.stat?.name;
//    })

//    const abilities = pokemon?.abilities.map((p) => {
//        return p?.ability?.name;
//    })

//    const moves = pokemon?.moves.map((p) => {
//        return p?.move.name;
//    })

//    return (
//        <>
//            <Link href='/' className="text-blue-300 font-bold ml-5 top-5">Back</Link>
//            <div className="flex justify-center items-center min-h-screen p-4 sm:p-6">
//                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                    <div className="flex justify-center items-center p-4 bg-blue-300 rounded-t-lg">
//                        <img
//                            className="rounded-t-lg w-full max-w-xs"
//                            src={pokemon?.sprites?.other?.dream_world?.front_default}
//                            alt="img"
//                        />
//                    </div>
//                    <div className="p-5 bg-orange-300 space-y-3">

//                        <p>
//                            <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
//                                Name:
//                            </span> &nbsp;
//                            {pokemon?.name}
//                        </p>
//                        <p>
//                            <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
//                                Type: &nbsp;
//                            </span>
//                            {types?.join(', ')}
//                        </p>
//                        <p>
//                            <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
//                                Stats: &nbsp;
//                            </span>
//                            {stats?.join(', ')}
//                        </p>
//                        <p>
//                            <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
//                                Abilities: &nbsp;
//                            </span>
//                            {abilities?.join(', ')}
//                        </p>
//                        <p>
//                            <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
//                                Some Moves: &nbsp;
//                            </span>
//                            {moves?.slice(0, 10)?.join(', ')}...
//                        </p>
//                    </div>
//                </div>
//            </div>

//        </>

//    );
//};

//export default PokemonCard;







"use client";

import { getPokemon } from "@/app/services/pokemonApi";
import Link from "next/link";
import { useEffect, useState } from "react";

const PokemonCard = ({ params }) => {
    const [pokemon, setPokemon] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const data = await getPokemon(params.name);
                setPokemon(data);
            } catch (error) {
                console.error("Failed to fetch Pokemon:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [params.name]);

    const types = pokemon?.types.map((p) => p.type?.name);
    const stats = pokemon?.stats.map((p) => p?.stat?.name);
    const abilities = pokemon?.abilities.map((p) => p?.ability?.name);
    const moves = pokemon?.moves.map((p) => p?.move.name);

    return (
        <>
            <Link href="/" className="text-blue-300 font-bold ml-5 mt-5">Back</Link>
            <div className="flex justify-center items-center min-h-screen p-4 sm:p-6">
                {loading ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex justify-center items-center p-4 bg-blue-300 rounded-t-lg">
                            <img
                                className="rounded-t-lg w-full h-64 object-contain"
                                src={pokemon?.sprites?.other?.dream_world?.front_default}
                                alt="img"
                            />
                        </div>
                        <div className="p-5 bg-orange-300 space-y-3">
                            <p>
                                <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
                                    Name:
                                </span> &nbsp;
                                {pokemon?.name}
                            </p>
                            <p>
                                <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
                                    Type: &nbsp;
                                </span>
                                {types?.join(', ')}
                            </p>
                            <p>
                                <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
                                    Stats: &nbsp;
                                </span>
                                {stats?.join(', ')}
                            </p>
                            <p>
                                <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
                                    Abilities: &nbsp;
                                </span>
                                {abilities?.join(', ')}
                            </p>
                            <p>
                                <span className="mb-3 font-bold text-black-700 dark:text-gray-400">
                                    Some Moves: &nbsp;
                                </span>
                                {moves?.slice(0, 10)?.join(', ')}...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default PokemonCard;

