import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setGameResults } from "../store/resultsSlice";
import appwriteResultService from "../appwrite/resultServices";
import { Container } from "../components/index";
import { format, parseISO, getISOWeek, getDay, startOfISOWeek, endOfISOWeek } from "date-fns";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const ResultJoid = () => {

    const dispatch = useDispatch();
    const { gameName: slug } = useParams();
    const gameName = decodeURIComponent(slug);
    const gameResults = useSelector((state) => state.results?.gameResults || []);
    const [groupedResults, setGroupedResults] = useState({});

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await appwriteResultService.getResults();
                if (response?.documents) {
                    dispatch(setGameResults(response.documents));
                } else {
                    console.warn("No documents found in response");
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };

        fetchResults();
    }, [dispatch]);

    useEffect(() => {

        if (gameName && gameResults.length > 0) {
            const filteredResults = gameResults.filter(result => slugTransform(result.gameName) === gameName);

            if (filteredResults.length > 0) {
                const grouped = filteredResults.reduce((acc, result) => {
                    const date = parseISO(result.date);
                    const week = getISOWeek(date);
                    const startDate = format(startOfISOWeek(date), "dd-MM-yyyy");
                    const endDate = format(endOfISOWeek(date), "dd-MM-yyyy");
                    const dayIndex = (getDay(date) + 6) % 7;
                    const dayName = daysOfWeek[dayIndex] || "Mon";

                    if (!acc[week]) {
                        acc[week] = { startDate, endDate, days: {} };
                        daysOfWeek.forEach((day) => (acc[week].days[day] = []));
                    }

                    acc[week].days[dayName].push({
                        firstD: result.firstD || "*",
                        secondD: result.secondD || "*",
                        thirdD: result.thirdD || "*",
                        fourD: result.fourD || "*",
                        fiveD: result.fiveD || "*",
                        sixD: result.sixD || "*",
                        seveenD: result.seveenD || "*",
                        eightD: result.eightD || "*",
                    });

                    return acc;
                }, {});

                Object.keys(grouped).forEach((week) => {
                    daysOfWeek.forEach((day) => {
                        if (grouped[week].days[day].length === 0) {
                            grouped[week].days[day].push({
                                firstD: "*",
                                secondD: "*",
                                thirdD: "*",
                                fourD: "*",
                                fiveD: "*",
                                sixD: "*",
                                seveenD: "*",
                                eightD: "*",
                            });
                        }
                    });
                });

                setGroupedResults(grouped);
            } else {
                console.warn("No results found for gameName:", gameName);
                setGroupedResults({});
            }
        }
    }, [gameName, gameResults]);


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);
    const sortedWeeks = Object.entries(groupedResults).sort((a, b) => {
        const dateA = parseISO(a[1].startDate.split('-').reverse().join('-'));
        const dateB = parseISO(b[1].startDate.split('-').reverse().join('-'));
        return dateB - dateA;
    });

    return (
        <div className="py-8">
            <Container>
                <h3 className="panel_heading text-xl font-bold uppercase text-center">{gameName} MATKA PANEL RECORD 2019 - 2025</h3>
                {sortedWeeks.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-400">
                        <thead>
                            <tr className="thead">
                                <th className="border border-gray-400 px-4 py-2">Date</th>
                                {daysOfWeek.map((day) => (
                                    <th key={day} className="border border-gray-400 px-4 py-2">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedWeeks.map(([week, data]) => (
                                <React.Fragment key={week}>
                                    <tr className="bg_transparent">
                                        <td className="border border-gray-400 px-4 py-2 font-bold text-center">
                                            {data.startDate.split('-').reverse().join('/')} <br /> to <br /> {data.endDate.split('-').reverse().join('/')}
                                        </td>
                                        {daysOfWeek.map((day) => (
                                            <td key={`${week}-${day}`} className="border border-gray-400 px-4 py-2 text-center">
                                                {data.days[day]?.length > 0 ? (
                                                    <div className="grid gap-2 text-center w-full">

                                                        <div className="mid-digits font-bold flex items-center justify-center min-h-[60px]">
                                                            {data.days[day].map((entry, index) => (
                                                                <div key={`mid-${week}-${day}-${index}`}>
                                                                    <span>{entry.fourD}</span>
                                                                    <span>{entry.fiveD}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                                ) : (
                                                    "*"
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No results available</p>
                )}
            </Container>
        </div>
    );
};

export default ResultJoid;
