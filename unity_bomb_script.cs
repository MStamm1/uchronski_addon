
public float gridSpacing;
public GameObject countdownObject;
public float invokeTime = 5f;
public byte explosionLenght

void Explode()
{
RaycastHit2D hitLeft(tranform.position, new Vecor2(-1,0), explosionLenght * gridSpacing)
RaycastHit2D hitRight(tranform.position, new Vecor2(1,0), explosionLenght * gridSpacing)
RaycastHit2D hitUp(tranform.position, new Vecor2(0,1), explosionLenght * gridSpacing)
RaycastHit2D hitDown(tranform.position, new Vecor2(0,-1), explosionLenght * gridSpacing)

Destroy(gameObject);
}

void CountDown(float Time, GameObject countdownObject)
{
if(Time > 0)
{
Time -= Time.DeltaTime;
countdownObject.tranform.localScale = new Vecor2(countdownObject.tranform.localScale.x * (Time / invokeTime),
									             countdownObject.tranform.localScale.y * (Time / invokeTime));
}
else
{
Explode();
}

void HandlePosition(ref Vector2 position)
{
float newx = Mathf.Round (position.x / gridSpacing) * gridSpacing;

float newy = Mathf.Round (position.y / gridSpacing) * gridSpacing;

position = new Vector2 (newx, newy);
}

void Start()
{
HandlePosition(tranform.position);
}

void Update()
{
CountDown();
}

























