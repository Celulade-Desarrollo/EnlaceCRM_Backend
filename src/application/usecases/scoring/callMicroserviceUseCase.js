export async function callMicroserviceUseCase(data) {
    const response = await fetch("http://localhost:2050/scoring", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const dataResponse = await response.json();
    return dataResponse;

}