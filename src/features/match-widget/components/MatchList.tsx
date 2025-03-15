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
              <h2 className='text-lg font-bold text-gray-800'>
                {match.homeTeam} vs {match.awayTeam}
              </h2>
              {match.soldOut && (
                <span className='text-red-500 font-semibold'>Sold Out</span>
              )}
            </div>
            <a
              href='https://resale.ajax.nl/content'
              className='text-blue-500 hover:underline'
            >
              View Match
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MatchList;
