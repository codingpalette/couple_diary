from fastapi import APIRouter


router = APIRouter(
    prefix="/diary"
)

@router.get('')
async def diary_get():
    print('1111')
    return True

