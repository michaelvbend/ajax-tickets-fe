interface Match {
  homeTeam: string;
  awayTeam: string;
  soldOut: boolean;
  matchLink: string;
}

interface MatchListProps {
  matchList: Match[];
}

function MatchList({ matchList }: MatchListProps) {
  if (matchList.length == 0) {
    return (
      <h2 className='text-lg font-bold text-gray-800'>No available matches</h2>
    );
  }

  return (
    <div className='space-y-4 '>
      {matchList.map((match, index) => (
        <div key={index} className='p-4 border rounded-lg shadow-md bg-white'>
          <div className='flex justify-between items-center gap-5'>
            <div>
              <h2 className='text-sm font-bold text-gray-800 min-w-max'>
                {match.homeTeam} vs {match.awayTeam}
              </h2>
            </div>
            <a
              href='https://resale.ajax.nl/content'
              className={`${
                match.soldOut ? 'text-red-500' : 'text-blue-500'
              } text-xs hover:underline`}
            >
              {match.soldOut ? 'Sold Out' : 'Open shop'}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchList;
