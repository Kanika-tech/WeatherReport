import moment from 'moment'
import styled from 'styled-components';

const DetailWrapper = styled.div`
    padding: 20px 40px;
    margin: 5px;
    background-color: aliceblue;
`;

const TodayDetail = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    margin: 10px 0;
    p{
        font-weight: 600;
        font-size: 40px;
        margin: 0;
    }
`;

const TodayDetailWrapper = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Info = styled.div`
    text-align: left;
    margin-left: 20px;
`;

function WeatherDetail({details, index}) {
    const { valid_date = '', weather : { icon = '', description}, temp = '' } = details;

    if(!details){
        return <div>Data not available</div>;
    }


    return (  
        <DetailWrapper>
            <div>{index === 0 ? <TodayDetailWrapper>
                <div>Today</div>
                <TodayDetail>
                    <img src={`${window.location.origin}/icons/${icon}.png`} alt={description}></img>
                    <Info>
                        <p>{parseInt(temp)}</p>
                        <span>{description}</span>
                    </Info>
                </TodayDetail>
            </TodayDetailWrapper>:  
            <>
            <div>{moment(valid_date).format('ddd')}</div>
            <img src={`${window.location.origin}/icons/${icon}.png`} alt={description}></img>
            <div>{parseInt(temp)}</div></> }
            </div>
        </DetailWrapper>
    );
}

export default WeatherDetail;

